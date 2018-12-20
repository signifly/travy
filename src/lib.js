import VueRouter from "vue-router";
import Vuex from "vuex";
import "normalize.css/normalize.css";
import "./style/index.scss";
import "./modules/element";

import errors from "./modules/errors";
import app from "./app.vue";


export const utils = require("./modules/utils");

export const plugin = {
	install(Vue, options) {
		Vue.config.productionTip = false;

		Vue.use(require("vue-shortkey"));
		Vue.use(VueRouter);
		Vue.use(Vuex);

		Vue.prototype.$axios = require("./modules/axios").default;
		Vue.options.router = require("./modules/router").default;
		Vue.options.store = require("./store").default;
		Vue.options.render = (h) => h(app);

		Vue.prototype.$plugin = Object.assign({
			fields: {}
		}, options);

		errors({Vue});
	}
};
