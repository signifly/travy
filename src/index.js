import Vue from "vue";

import "./assets/favicon.png?name";
import "./style/index.scss";
import "./modules/notify";

import router from "./modules/router";
import axios from "./modules/axios";
import meta from "./modules/meta";
import store from "./store";
import app from "./app.vue";

Vue.prototype.$http = axios;
Vue.prototype.$meta = meta;

(async() => {
	await store.dispatch("config/data");

	new Vue({
		el: "#app",
		router, store,
		render: h => h(app)
	});
})();
