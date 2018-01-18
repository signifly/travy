import Vue from "vue";
import qs from "qs";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import index from "@/pages/index.vue";
import products from "@/pages/products.vue";
import product from "@/pages/product.vue";
import currencies from "@/pages/currencies.vue";

const routes = [
	{path: "/", name: "index", component: index},
	{path: "/products", name: "products", component: products},
	{path: "/products/:id", name: "product", component: product},

	{path: "/currencies", name: "currencies", component: currencies}
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
