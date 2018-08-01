import "babel-polyfill";
import Vue from "vue";

import "./assets/favicon.png?name";
import "./style/index.scss";
import "./modules/errors";

import router from "./modules/router";
import axios from "./modules/axios";
import store from "./store";
import app from "./app.vue";

Vue.prototype.$http = axios;

(async() => {
	await store.dispatch("config/data");

	new Vue({
		el: "#app",
		router, store,
		render: h => h(app)
	});
})();
