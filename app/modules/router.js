import Vue from "vue";
import qs from "qs";
import {map, mapValues} from "lodash";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import store from "@/store";

import doc from "@/pages/doc.vue";
import tables from "./tables";
import index from "@/pages/index.vue";
import login from "@/pages/login.vue";
import table from "@/pages/table.vue";
import view from "@/pages/view.vue";
import _404 from "@/pages/404.vue";

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
	{path: "/", name: "index", component: index},
	{path: "/login", name: "login", component: login, props: true, meta: {layout: "vBase"}},
	{path: "/doc", name: "doc", component: doc, meta: {layout: "vBase"}},
	{path: "/*", name: "404", component: _404}
];

const router = new VueRouter({
	routes: [...routesTables, ...routesViews, ...routes],
	mode: "history",
	parseQuery(query) {
		const types = {false: false, true: true, null: null, undefined: undefined};
		return mapValues(qs.parse(query), (val1) => mapValues(val1, (val2) => val2 in types ? types[val2] : val2));
	},
	stringifyQuery(query) {
		const res = qs.stringify(query);
		return res ? ("?" + res) : "";
	}
});

router.beforeEach(async (to, from, next) => {
	if (to.name === "login") return next();
	const user = store.getters["user/data"] || await store.dispatch("user/data");

	if (user) {
		next();
	} else {
		next({name: "login", replace: true, params: {route: to}});
	}
});

export default router;
