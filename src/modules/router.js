import VueRouter from "vue-router";
import store from "@/store";
import urlon from "urlon";
import Vue from "vue";

// pages
import index from "@/pages";
import account from "@/pages/account.vue";

import login from "@/pages/login";
import loginReset from "@/pages/login/reset.vue";

import dashboard from "@/pages/dashboard";
import table from "@/pages/table";
import view from "@/pages/view";

import error from "@/pages/error.vue";

import meta from "@/pages/meta";
import metaHome from "@/pages/meta/pages/home";
import metaPage from "@/pages/meta/pages/index";

const routes = [
	{
		path: "/",
		name: "index",
		component: index,
		meta: {title: ""}
	},
	{
		path: "/account",
		name: "account",
		component: account
	},
	{
		path: "/login",
		name: "login",
		component: login,
		props: true,
		meta: {layout: "base", public: true}
	},
	{
		path: "/login/reset/:id",
		name: "login-reset",
		component: loginReset,
		props: true,
		meta: {layout: "base", public: true}
	},
	{
		path: "/t/:tableId",
		name: "table",
		component: table
	},
	{
		path: "/t/:tableId/:viewId",
		name: "tableView",
		component: view
	},
	{
		path: "/d/:id",
		name: "dashboard",
		component: dashboard
	},
	{
		path: "/error",
		name: "error",
		props: true,
		alias: "*",
		component: error,
		meta: {title: "Error"}
	},
	{
		path: "/meta",
		component: meta,
		children: [
			{
				path: "",
				name: "meta",
				component: metaHome,
				meta: {layout: "base", title: "Meta"}
			},
			{
				path: "*",
				name: "meta-page",
				component: metaPage,
				meta: {layout: "base", title: "Meta"}
			}
		]
	}
];

const router = new VueRouter({
	routes: [...routes, ...Vue.prototype.$settings.routes],
	mode: "history",
	parseQuery(query) {
		return query ? urlon.parse(query) : {};
	},
	stringifyQuery(query) {
		const res = urlon.stringify(query);
		return res === "$" ? "" : `?${res}`;
	}
});

const go = ({to, next}) => {
	if (to.meta.title) {
		store.dispatch("base/meta", {title: to.meta.title});
	}

	next();
};

router.beforeEach(async (to, from, next) => {
	if (to.meta.public) return go({to, next});

	const user =
		store.getters["user/data"] || (await store.dispatch("user/data"));

	if (!user) {
		return store.dispatch("user/logout");
	}

	go({to, next});
});

export default router;
