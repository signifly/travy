import Vue from "vue";
import qs from "qs";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import index from "@/pages/index.vue";
import products from "@/pages/products.vue";
import product from "@/pages/product.vue";

import collections from "@/pages/collections.vue";
import currencies from "@/pages/currencies.vue";
import languages from "@/pages/languages.vue";
import materials from "@/pages/materials.vue";
import shops from "@/pages/shops.vue";

const routes = [
	{path: "/", name: "index", component: index},
	{path: "/products", name: "products", component: products},
	{path: "/products/:id", name: "product", component: product, children: [
		{path: ":tab", name: "product-tab", component: product}
	]},

	{path: "/collections", name: "collections", component: collections},
	{path: "/currencies", name: "currencies", component: currencies},
	{path: "/languages", name: "languages", component: languages},
	{path: "/materials", name: "materials", component: materials},
	{path: "/shops", name: "shops", component: shops},
];

const router = new VueRouter({
	mode: "history",
	routes,
	parseQuery(query) {
		return qs.parse(query);
	},
	stringifyQuery(query) {
		const res = qs.stringify(query);
		return res ? ("?" + res) : "";
	}
});

export default router;
