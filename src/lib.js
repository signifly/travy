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
	const test = process.env.NODE_ENV === "test";
	Vue.use(require("vue-shortkey"));
	Vue.use(VueRouter);
	Vue.use(Vuex);

	Vue.prototype.$opts = Object.assign({fields: {}}, opts);

	const {default: router} = require("./modules/router");
	const {default: ws} = require("./modules/ws");
	const {default: store} = require("./store");
	const {api} = require("./modules/axios");

	Vue.prototype.$translate = utils.translate;
	Vue.prototype.$axios = api;
	Vue.prototype.$ws = ws;

	if (!test) {
		favicon();
		errors();
	}

	if (init) {
		init({store, router});
	}

	return new Vue({
		store,
		router,
		el: !test && "#app",
		render: (h) => h(app)
	});
};

export {components, setup, utils};
