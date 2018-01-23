import Vue from "vue";
import qs from "qs";
import {map} from "lodash";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import tables from "./tables";
import index from "@/pages/index.vue";
import product from "@/pages/product.vue";
import table from "@/pages/table.vue";
import view from "@/pages/view.vue";
import _404 from "@/pages/404.vue";

const routesTables = map(tables, (item, id) => ({
	path: `/${id}`,
	name: id,
	component: table,
	meta: item
}));

const routesViews = map(tables, (item, id) => ({
	path: `/${id}/:id`,
	name: `${id}-view`,
	component: view,
	meta: {
		parent: {...item, id}
	}
}));

const routes = [
	{path: "/", name: "index", component: index},
	{path: "/products/:id", name: "product", component: product, children: [
		{path: ":tab", name: "product-tab", component: product}
	]},

	{path: "/*", name: "404", component: _404}
];


const router = new VueRouter({
	mode: "history",
	routes: [
		...routesTables,
		...routesViews,
		...routes
	],
	parseQuery(query) {
		return qs.parse(query);
	},
	stringifyQuery(query) {
		const res = qs.stringify(query);
		return res ? ("?" + res) : "";
	}
});

export default router;
