import Vue from "vue";
import qs from "qs";
import {get, map, mapValues, isPlainObject} from "lodash";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import store from "@/store";

import doc from "@/pages/doc.vue";
import tables from "./tables";
import index from "@/pages/index.vue";
import login from "@/pages/login/index.vue";
import loginReset from "@/pages/login/reset.vue";
import table from "@/pages/table.vue";
import view from "@/pages/view.vue";
import _404 from "@/pages/404.vue";
import _401 from "@/pages/401.vue";


const routesTables = map(tables, (item, id) => ({
	path: `/${id}`,
	name: id,
	component: table,
	meta: {...item, id}
}));


const routesViews = map(tables, (item, id) => ({
	path: `/${id}/:id/:tab?`,
	name: `${id}-view`,
	component: view,
	props: true,
	meta: {...item, id}
}));


const routes = [
	{path: "/login", name: "login", component: login, props: true, meta: {layout: "vBase"}},
	{path: "/login/reset/:id", name: "login-reset", component: loginReset, props: true, meta: {layout: "vBase"}},
	{path: "/doc", name: "doc", component: doc, meta: {layout: "vBase", auth: {roles: "all"}}},

	{path: "/", name: "index", component: index, redirect: "/products", meta: {auth: {roles: "all"}}},
	{path: "/401", name: "401", component: _401, meta: {auth: {roles: "all"}}},
	{path: "/*", name: "404", component: _404, meta: {auth: {roles: "all"}}}
];


const router = new VueRouter({
	routes: [...routesTables, ...routesViews, ...routes],
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


router.beforeEach(async (to, from, next) => {
	if (!to.meta.auth) return next(); // allow all routes that isn't protected by auth

	const {role} = store.getters["user/data"] || await store.dispatch("user/data");
	const roles = get(to.meta, "auth.roles", []);

	const valid = roles === "all" || roles.includes(role);

	next(valid || {name: "401", replace: true});
});


export default router;
