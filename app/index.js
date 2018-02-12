import Vue from "vue";

import "./assets/favicon.png?name";
import "./style/index.scss";

import router from "./modules/router";
import store from "./store";
import app from "./app.vue";
import axios from "./modules/axios";
import "./modules/notify";

Vue.prototype.$http = axios;

new Vue({
	router, store,
	render: h => h(app)
}).$mount("#app");
