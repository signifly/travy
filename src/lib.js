import VueRouter from "vue-router";
import Vuex from "vuex";
import Vue from "vue";


import "normalize.css/normalize.css";
import "./style/index.scss";
import "./modules/element";
import "./modules/favicon";


import * as utils from "./modules/utils";
import errors from "./modules/errors";
import app from "./app.vue";


const start = (options) => {
	Vue.use(require("vue-shortkey"));
	Vue.use(VueRouter);
	Vue.use(Vuex);

	Vue.prototype.$settings = Object.assign({
		routes: [],
		fields: {},
		api: ""
	}, options);

	const {default: router} = require("./modules/router");
	const {default: axios} = require("./modules/axios");
	const {default: store} = require("./store");

	Vue.prototype.$axios = axios;
	errors();

	return new Vue({
		el: "#app",
		router, store,
		render: (h) => h(app)
	});
};


export {
	start as app,
	utils,
	Vue
};
