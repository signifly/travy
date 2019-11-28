import VueRouter from "vue-router";
import Vuex from "vuex";
import Vue from "vue";

import "normalize.css/normalize.css";
import "./style/index.scss";
import "./modules/element";

import * as utils from "./modules/utils";
import favicon from "./modules/favicon";
import errors from "./modules/errors";

import app from "./app";

const components = {
	action: require("@/components/actions").default
};

const setup = ({init, ...opts}) => {
	Vue.use(require("vue-shortkey"));
	Vue.use(VueRouter);
	Vue.use(Vuex);

	opts = Vue.prototype.$opts = Object.assign(
		{
			test: false,
			fields: {},
			api: ""
		},
		opts
	);

	const {default: router} = require("./modules/router");
	const {default: ws} = require("./modules/ws");
	const {default: store} = require("./store");
	const {api} = require("./modules/axios");

	Vue.prototype.$translate = utils.translate;
	Vue.prototype.$axios = api;
	Vue.prototype.$ws = ws;

	if (!opts.test) {
		favicon();
		errors();
	}

	if (init) {
		init({store, router});
	}

	return new Vue({
		store,
		router,
		render: (h) => h(app),
		el: !opts.test && "#app"
	});
};

export {components, setup, utils};
