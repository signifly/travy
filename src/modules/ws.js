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
	list: [], // {channel, auth, cb, subscribed};

	async subscribe(item) {
		const subscribed = this.list.find(
			(x) => x.channel === item.channel && x.subscribed
		);

		// channel is already subscribed to
		if (subscribed) return;

		// mark current listener as subscribed
		item.subscribed = true;

		// get private channel token
		const url = Vue.prototype.$opts.api;

		const {data} = await api.post(`${url}/broadcasting/auth`, {
			channel_name: item.channel,
			socket_id: state.socketId
		});

		item.auth = data.auth;

		// subscribe to channel
		state.ws.send(
			JSON.stringify({
				event: "pusher:subscribe",
				data: {
					channel: item.channel,
					auth: item.auth
				}
			})
		);
	},

	subscribeAll() {
		this.list.forEach((x) => this.subscribe(x));
	},

	add(item) {
		const current = this.list.find(
			(x) =>
				x.channel === item.channel && x.cb.toString() === item.cb.toString()
		);

		if (current) {
			current.cb = item.cb;
		} else {
			this.list.push(item);
			if (state.wsState === "open") {
				this.subscribe(item);
			}
		}
	},

	remove({channel}) {
		const item = this.list.find((x) => x.channel === channel);
		this.list = this.list.filter((x) => x.channel !== channel);

		if (!item) return;

		if (state.wsState !== "open") return;

		// unsubscribe
		state.ws.send(
			JSON.stringify({
				event: "pusher:unsubscribe",
				data: {channel}
			})
		);
	}
};

const reset = () => {
	listeners.list.forEach((item) => (item.subscribed = false));
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

		// emit non-subscribe messages
		if (msg.event !== "pusher_internal:subscription_succeeded") {
			listeners.list
				.filter((x) => x.channel === msg.channel)
				.forEach((x) => x.cb(msg));
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

	stop(channel) {
		listeners.remove({channel});
	},

	close() {
		if (state.ws.close) {
			state.ws.close();
		}
	}
};
