import {get, map, mapValues, isPlainObject} from "lodash";
import VueRouter from "vue-router";
import Vue from "vue";
import qs from "qs";

Vue.use(VueRouter);
import store from "@/store";

// pages
import index from "@/pages/index.vue";
import account from "@/pages/account.vue";
import ext from "@/pages/ext.vue";

import login from "@/pages/login/index.vue";
import loginReset from "@/pages/login/reset.vue";

import table from "@/pages/table.vue";
import view from "@/pages/view.vue";

import _404 from "@/pages/404.vue";
import _401 from "@/pages/401.vue";
import error from "@/pages/error.vue";

const meta = () => import(/* webpackChunkName: "app.page-meta" */ "@/pages/meta.vue");
const metaIndex = () => import(/* webpackChunkName: "app.page-metaIndex" */ "@/components/meta/index.vue");
const metaFields = () => import(/* webpackChunkName: "app.page-metaFields" */ "@/components/meta/fields/index.vue");


const routes = [
	{
		path: "/meta",
		component: meta,
		children: [
			{path: "", name: "meta", component: metaIndex, meta: {layout: "vBase", title: "Meta", auth: {roles: "all"}}},
			{path: "fields", name: "metaFields", component: metaFields, meta: {layout: "vBase", title: "Meta/Fields", auth: {roles: "all"}}},
		]
	},

	{path: "/", name: "index", component: index, meta: {layout: "vMain", title: "", auth: {roles: "all"}}},
	{path: "/account", name: "account", component: account, meta: {layout: "vMain", title: "Account", auth: {roles: "all"}}},
	{path: "/ext", name: "ext", component: ext, meta: {title: "Externals", layout: "vMain", auth: {roles: "all"}}},

	{path: "/login", name: "login", component: login, props: true, meta: {layout: "vBase", title: "Login"}},
	{path: "/login/reset/:id", name: "login-reset", component: loginReset, props: true, meta: {layout: "vBase", title: "Reset login"}},

	{path: "/t/:tableId", name: "table", component: table, meta: {layout: "vMain", auth: {roles: "all"}}},
	{path: "/t/:tableId/:viewId", name: "tableView", component: view, meta: {layout: "vMain", auth: {roles: "all"}}},

	{path: "/401", name: "401", component: _401, meta: {title: "401", layout: "vMain", auth: {roles: "all"}}},
	{path: "/error", name: "error", component: error, meta: {title: "Error", layout: "vMain", layout: "vBase"}},
	{path: "/404", alias: "*", name: "404", component: _404, meta: {title: "404", layout: "vMain", auth: {roles: "all"}}}
];


const router = new VueRouter({
	routes,
	mode: "history",
	parseQuery(query) {
		const types = {false: false, true: true, null: null, undefined: undefined};
		return mapValues(qs.parse(query), (val1) => {
			return !isPlainObject(val1) ? val1 : mapValues(val1, (val2) => {
				return val2 in types ? types[val2] : val2;
			});
		});
	},
	stringifyQuery(query) {
		const res = qs.stringify(query);
		return res ? ("?" + res) : "";
	}
});


const go = ({to, from, next}) => {
	if (to.meta.title) {
		store.dispatch("base/meta", {title: to.meta.title});
	}

	next();
};

router.beforeEach(async (to, from, next) => {
	if (!to.meta.auth) return go({to, from, next}); // allow all routes that isn't protected by auth

	const user = store.getters["user/data"] || await store.dispatch("user/data");
	const roles = get(to.meta, "auth.roles", []);


	if (!user) return store.dispatch("user/logout");

	if (roles === "all" || roles.includes(user.role)) {
		go({to, from, next});
	} else {
		next({name: "401", replace: true});
	}
});


export default router;
