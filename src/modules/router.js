import {get, transform, isObject, isFinite} from "lodash";
import VueRouter from "vue-router";
import store from "@/store";
import Vue from "vue";
import qs from "qs";


// pages
import index from "@/pages";
import account from "@/pages/account.vue";

import login from "@/pages/login";
import loginReset from "@/pages/login/reset.vue";

import dashboard from "@/pages/dashboard";
import custom from "@/pages/custom.vue";
import table from "@/pages/table";
import view from "@/pages/view";

import error from "@/pages/error.vue";

import meta from "@/pages/meta";
import metaHome from "@/pages/meta/pages/home";
import metaFields from "@/pages/meta/pages/fields";
import metaActions from "@/pages/meta/pages/actions";


const routes = [
	{path: "/", name: "index", component: index, meta: {layout: "main", title: "", auth: {roles: "all"}}},
	{path: "/account", name: "account", component: account, meta: {layout: "main", title: "Account", auth: {roles: "all"}}},

	{path: "/login", name: "login", component: login, props: true, meta: {layout: "base", title: "Login"}},
	{path: "/login/reset/:id", name: "login-reset", component: loginReset, props: true, meta: {layout: "base", title: "Reset login"}},

	{path: "/t/:tableId", name: "table", component: table, meta: {layout: "main", auth: {roles: "all"}}},
	{path: "/t/:tableId/:viewId/:tabId?", name: "tableView", component: view, meta: {layout: "main", auth: {roles: "all"}}},

	{path: "/d/:id", name: "dashboard", component: dashboard, meta: {layout: "main", auth: {roles: "all"}}},

	{path: "/c/:id", name: "custom", component: custom, meta: {layout: "main", auth: {roles: "all"}}},

	{path: "/error", alias: "*", name: "error", props: true, component: error, meta: {layout: "error", title: "Error"}},

	{
		path: "/meta",
		component: meta,
		children: [
			{path: "", name: "meta", component: metaHome, meta: {layout: "base", title: "Meta", auth: {roles: "all"}}},
			{path: "fields", name: "meta-fields", component: metaFields, meta: {layout: "base", title: "Meta/Fields", auth: {roles: "all"}}},
			{path: "actions", name: "meta-actions", component: metaActions, meta: {layout: "base", title: "Meta/Actions", auth: {roles: "all"}}},
		]
	}
];


const router = new VueRouter({
	routes: [...routes, ...Vue.prototype.$settings.routes],
	mode: "history",
	parseQuery(query) {
		const parse = (item) => transform(item, (res, val, key) => {
			const types = {false: false, true: true, null: null, undefined: undefined};

			if (isObject(val)) {
				res[key] = parse(val);

			} else if (val in types) {
				res[key] = types[val];

			} else if (isFinite(parseInt(val))) {
				res[key] = parseInt(val);

			} else {
				res[key] = val;
			}
		});

		return parse(qs.parse(query));
	},
	stringifyQuery(query) {
		const res = qs.stringify(query);
		return res ? ("?" + res) : "";
	}
});


const go = ({to, next}) => {
	if (to.meta.title) {
		store.dispatch("base/meta", {title: to.meta.title});
	}

	next();
};


router.beforeEach(async (to, from, next) => {
	// get config if not fetched
	store.getters["config/data"] || await store.dispatch("config/data");

	// allow all routes that isn't protected by auth
	if (!to.meta.auth) return go({to, next});

	// get user if not fetched
	const user = store.getters["user/data"] || await store.dispatch("user/data");
	const roles = get(to.meta, "auth.roles", []);

	if (!user) return store.dispatch("user/logout");

	if (roles === "all" || roles.includes(user.role)) {
		go({to, next});
	} else {
		next({name: "error", replace: true, params: {status: 403}});
	}
});


export default router;
