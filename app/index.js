import Vue from "vue";

import router from "./modules/router";
import store from "./store";
import app from "./app.vue";
import "./style/index.scss";

new Vue({
	router, store,
	render: h => h(app)
}).$mount("#app");
