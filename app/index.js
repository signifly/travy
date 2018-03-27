import Vue from "vue";

import "./assets/favicon.png?name";
import "./style/index.scss";
import "./modules/notify";

import router from "./modules/router";
import axios from "./modules/axios";
import store from "./store";
import app from "./app.vue";

Vue.prototype.$http = axios;

new Vue({
	router, store,
	render: h => h(app)
}).$mount("#app");
