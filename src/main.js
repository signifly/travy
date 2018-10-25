import Vue from "vue";
Vue.use(require("vue-shortkey"));

import "normalize.css/normalize.css";
import "./style/index.scss";
import "@/modules/element";
import "./modules/errors";

import router from "./modules/router";
import axios from "./modules/axios";
import store from "./store";
import app from "./app.vue";

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

(async() => {
	await store.dispatch("config/data");

	const instance = new Vue({
		el: "#app",
		router, store,
		render: h => h(app)
	});

	window.Vue = Vue;
	window.travy = instance;
})();
