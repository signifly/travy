import Vue from "vue";

import "./assets/favicon.png?name";
import "./style/index.scss";

import router from "./modules/router";
import store from "./store";
import app from "./app.vue";
import "./modules/axios";
import "./modules/notify";

new Vue({
	router, store,
	render: h => h(app)
}).$mount("#app");
