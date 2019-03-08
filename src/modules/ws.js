import store from "@/store";
import axios from "@/modules/axios";
const dev = process.env.NODE_ENV === "development";
const domain = process.env.API.replace("https://", "");

const newState = () => ({socketId: null, ws: null});
let state = newState();
let started = false;



const listeners = {
	list: [], // {channel, auth, cb, subscribed};

	async subscribe(item) {
		const subscribed = this.list.find(x => x.channel === item.channel && x.subscribed);
		item.subscribed = true;

		// channel is already subscribed to
		if (subscribed) return;

		// get private channel token
		if (item.channel.startsWith("private")) {
			const {data} = await axios.post(`${process.env.API}/broadcasting/auth`, {
				socket_id: state.socketId,
				channel_name: item.channel
			});

			item.auth = data.auth;
		}

		// subscribe to channel
		state.ws.send(JSON.stringify({
			event: "pusher:subscribe",
			data: {
				channel: item.channel,
				auth: item.auth
			}
		}));
	},
	subscribeAll() {
		this.list.forEach(x => this.subscribe(x));
	},
	push(item) {
		if (state.socketId) this.subscribe(item);
		this.list.push(item);
	}
};



const connect = () => {
	state.ws = new WebSocket(`wss://${domain}:6002/app/r5VjqDD4ZmLXPw9r`);
	started = true;

	const ping = {
		interval: null,

		// keep connection alive
		start(time) {
			this.interval = setInterval(() => {
				state.ws.send(JSON.stringify({
					event: "pusher:ping"
				}));
			}, (time - 1) * 1000);
		},

		stop() {
			clearInterval(this.interval);
		}
	};

	state.ws.addEventListener("open", (e) => {
		console.log("ws open", e);
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
			listeners.list.filter(x => x.channel === msg.channel).forEach(x => x.cb(msg));
		}

		if (dev && msg.event !== "pusher:pong") {
			console.log("ws", msg);
		}
	});

	state.ws.addEventListener("error", (e) => {
		console.log("ws error", e);
	});

	state.ws.addEventListener("close", (e) => {
		console.log("ws close", e);

		store.dispatch("notify/send", {
			message: "Connection closed",
			type: "warning",
			title: `WS`
		});

		// reset
		listeners.list.forEach(item => item.subscribed = false);
		state = newState();
		ping.stop();

		// reconnect
		setTimeout(connect, 5000);
	});
};



export default {
	on(channel, cb) {
		listeners.push({channel, cb});

		// start ws connection
		if (!started) {
			started = true;
			connect();
		}
	}
};
