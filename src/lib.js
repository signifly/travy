import VueRouter from "vue-router";
import Vuex from "vuex";

import "./modules/element";
import "./style/index.scss";
import "normalize.css/normalize.css";

import errors from "./modules/errors";
import app from "./app.vue";


export const utils = require("./modules/utils");


export const plugin = {
	install(Vue, options) {
		Vue.config.productionTip = false;

		// set plugin options
		Vue.prototype.$plugin = Object.assign({
			routes: [],
			fields: {},
			api: ""
		}, options);


		// use
		Vue.use(require("vue-shortkey"));
		Vue.use(VueRouter);
		Vue.use(Vuex);


		// modules
		Vue.prototype.$axios = require("./modules/axios").default;
		Vue.options.router = require("./modules/router").default;
		Vue.options.store = require("./store").default;
		Vue.options.render = (h) => h(app);


		errors({Vue});
	}
};
