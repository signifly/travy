import {get, map, mapValues, isPlainObject} from "lodash";
import VueRouter from "vue-router";
import Vue from "vue";
import qs from "qs";

Vue.use(VueRouter);

import store from "@/store";
import meta from "./meta";

import tables from "./tables";
import index from "@/pages/index.vue";
import login from "@/pages/login/index.vue";
import loginReset from "@/pages/login/reset.vue";
import ext from "@/pages/ext.vue";
import table from "@/pages/table.vue";
import view from "@/pages/view.vue";
import _404 from "@/pages/404.vue";
import _401 from "@/pages/401.vue";
import error from "@/pages/error.vue";
import doc from "@/pages/doc.vue";
const docFields = () => import(/* webpackChunkName: "doc-fields" */ "@/components/doc/fields/index.vue");


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
	{
		meta: {title: "Doc", layout: "vBase", auth: {roles: "all"}},
		redirect: "/doc/fields",
		path: "/doc",
		name: "doc",
		component: doc,
		children: [
			{path: "fields", name: "doc-fields", component: docFields, meta: {title: "Doc fields", layout: "vBase", auth: {roles: "all"}}}
		]
	},

	{path: "/login", name: "login", component: login, props: true, meta: {layout: "vBase", title: "Login"}},
	{path: "/login/reset/:id", name: "login-reset", component: loginReset, props: true, meta: {layout: "vBase", title: "Reset login"}},
	{path: "/ext", name: "ext", component: ext, meta: {title: "Externals", auth: {roles: "all"}}},
	{path: "/", name: "index", component: index, redirect: "/products", meta: {auth: {roles: "all"}}},
	{path: "/401", name: "401", component: _401, meta: {title: "401", auth: {roles: "all"}}},
	{path: "/error", name: "error", component: error, meta: {title: "Error", layout: "vBase"}},
	{path: "/*", name: "404", component: _404, meta: {title: "404", auth: {roles: "all"}}}
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


const go = ({to, next}) => {
	const id = to.params.id;
	const title = id ? `${to.meta.title} / ${id}` : to.meta.title;
	meta({title});
	next();
};


router.beforeEach(async (to, from, next) => {
	if (!to.meta.auth) return go({to, next}); // allow all routes that isn't protected by auth

	const user = store.getters["user/data"] || await store.dispatch("user/data");

	const roles = get(to.meta, "auth.roles", []);

	if (!user) return store.dispatch("user/logout");

	const valid = roles === "all" || roles.includes(user.role);

	if (valid) {
		go({to, next});
	} else {
		next({name: "401", replace: true});
	}
});


export default router;
