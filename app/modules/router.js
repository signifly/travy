import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import index from "../pages/index.vue";
import products from "../pages/products.vue";

const routes = [
	{path: "/", name: "index", component: index},
	{path: "/products", name: "products", component: products}
];

const router = new VueRouter({
	mode: "history",
	routes
});

export default router;
