import VueRouter from "vue-router";
import Vuex from "vuex";
import Vue from "vue";

import "normalize.css/normalize.css";
import "./style/index.scss";
import "./modules/element";

import * as utils from "./modules/utils";
import favicon from "./modules/favicon";
import errors from "./modules/errors";
import app from "./app.vue";

const components = {
	action: require("@/components/actions").default
};

const start = (options) => {
	Vue.use(require("vue-shortkey"));
	Vue.use(VueRouter);
	Vue.use(Vuex);

	const settings = (Vue.prototype.$settings = Object.assign(
		{
			test: false,
			routes: [],
			fields: {},
			api: ""
		},
		options
	));

	const {default: router} = require("./modules/router");
	const {default: axios} = require("./modules/axios");
	const {default: ws} = require("./modules/ws");
	const {default: store} = require("./store");

	Vue.prototype.$translate = utils.translate;
	Vue.prototype.$axios = axios;
	Vue.prototype.$ws = ws;

	if (!settings.test) {
		favicon();
		errors();
	}

	return new Vue({
		store,
		router,
		render: (h) => h(app),
		el: !settings.test && "#app"
	});
};

export {start as app, utils, Vue, components};
