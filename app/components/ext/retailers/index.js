import Vue from "vue";
import app from "./index.vue";
import axios from "./modules/axios";

Vue.prototype.$http = axios;

import "./modules/maps";
import "@/style/index.scss";

// find retailers script and add app div after it

try {
	const script = document.querySelector("script[src*='ext/retailers.js']");
	script.insertAdjacentHTML("afterend", "<div id='app'></div>");

	new Vue({
		el: "#app",
		render: h => h(app)
	});

} catch(err) {
	console.log(err);
}
