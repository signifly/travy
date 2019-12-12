const dev = process.env.NODE_ENV === "development";
import {api} from "@/modules/axios";
import store from "@/store";
import Vue from "vue";

const state = {
	ws: {},
	socketId: null,
	get wsState() {
		return {
			0: "connecting",
			1: "open",
			2: "closing",
			3: "closed"
		}[this.ws.readyState];
	}
};

// keep connection alive
const ping = {
	interval: null,

	start(time) {
		this.interval = setInterval(() => {
			state.ws.send(
				JSON.stringify({
					event: "pusher:ping"
				})
			);
		}, time * 1000);
	},

	stop() {
		clearInterval(this.interval);
	}
};

const listeners = {
	list: {}, // channel: {subscribed, auth, cbs: []};

	async subscribe({channel}) {
		const item = this.list[channel];

		// if already subscribed
		if (item.subscribed) return;

		// mark current listener as subscribed
		item.subscribed = true;

		// get private channel token
		const url = Vue.prototype.$opts.api;

		const {data} = await api.post(`${url}/broadcasting/auth`, {
			socket_id: state.socketId,
			channel_name: channel
		});

		item.auth = data.auth;

		// subscribe to channel
		state.ws.send(
			JSON.stringify({
				event: "pusher:subscribe",
				data: {
					channel: channel,
					auth: item.auth
				}
			})
		);
	},

	subscribeAll() {
		Object.keys(this.list).forEach((channel) => this.subscribe({channel}));
	},

	add({channel, cb}) {
		const current = this.list[channel];

		if (current) {
			current.cbs.push(cb);
		} else {
			this.list[channel] = {subscribed: false, cbs: [cb]};

			if (state.wsState === "open") {
				this.subscribe({channel});
			}
		}
	},

	remove({channel, cb}) {
		const item = this.list[channel];
		if (!item) return;

		// remove callback
		item.cbs = item.cbs.filter((x) => x !== cb);

		if (state.wsState !== "open") return;

		// unsubscribe and remove item if no callbacks
		if (!item.cbs.length) {
			delete this.list[channel];
			state.ws.send(
				JSON.stringify({
					event: "pusher:unsubscribe",
					data: {channel}
				})
			);
		}
	}
};

const reset = () => {
	Object.values(listeners.list).forEach((item) => (item.subscribed = false));
	state.ws = {};
	ping.stop();
};

const connect = () => {
	const url = store.getters["config/ws"];
	state.ws = new WebSocket(url);

	state.ws.addEventListener("open", (e) => {
		if (dev) console.log("ws open", e);
	});

	state.ws.addEventListener("message", ({data}) => {
		// parse json
		const msg = JSON.parse(data);
		if (typeof msg.data === "string") msg.data = JSON.parse(msg.data);

		// connection established
		if (msg.event === "pusher:connection_established") {
			ping.start(msg.data.activity_timeout);
			state.socketId = msg.data.socket_id;
			listeners.subscribeAll();
		}

		// emit non-pusher messages
		if (!msg.event.startsWith("pusher")) {
			(listeners.list[msg.channel] || {cbs: []}).cbs.forEach((cb) => cb(msg));
		}

		if (dev && msg.event !== "pusher:pong") {
			console.log("ws", msg);
		}
	});

	state.ws.addEventListener("error", (e) => {
		console.log("ws error", e);
	});

	state.ws.addEventListener("close", (e) => {
		if (dev) console.log("ws close", e);

		reset();

		setTimeout(() => {
			const user = store.getters["user/data"];

			if (user) {
				connect();
			}
		}, 3000);
	});
};

export default {
	on(channel, cb) {
		listeners.add({channel: `private-${channel}`, cb});

		// if never started or closed
		if (state.wsState === undefined || state.wsState === "closed") {
			connect();
		}
	},

	stop(channel, cb) {
		listeners.remove({channel: `private-${channel}`, cb});
	},

	close() {
		if (state.ws.close) {
			state.ws.close();
		}
	}
};
