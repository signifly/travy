import Vue from "vue";
import app from "./index.vue";
import axios from "./modules/axios";

import "./modules/maps";
import "@/style/index.scss";

Vue.prototype.$http = axios;

const setHost = (script) => {
	try {
		// find origin to load external required assets
		const {origin} = new URL(script.getAttribute("src"));
		Vue.prototype.$host = origin;

	} catch(err) {
		// script loaded on /ext/retailers, use current location origin
		Vue.prototype.$host = location.origin;
	}
};

try {
	// find retailers script and add app div after it
	const script = document.querySelector("script[src*='ext/retailers.js']");
	script.insertAdjacentHTML("afterend", "<div id='app'></div>");

	setHost(script);

	new Vue({
		el: "#app",
		render: h => h(app)
	});

} catch(err) {
	console.log(err);
}
