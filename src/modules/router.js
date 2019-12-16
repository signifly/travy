import VueRouter from "vue-router";
import store from "@/store";
import urlon from "urlon";

// pages
import home from "@/pages/home";
import account from "@/pages/account.vue";

import login from "@/pages/login";
import loginReset from "@/pages/login/reset.vue";

import dashboard from "@/pages/dashboard";
import index from "@/pages/index";
import view from "@/pages/view";

import error from "@/pages/error.vue";

import meta from "@/pages/meta";
import metaHome from "@/pages/meta/pages/home";
import metaPage from "@/pages/meta/pages/index";

const routes = [
	{
		path: "/",
		name: "home",
		component: home,
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
		path: "/i/:indexId",
		name: "index",
		component: index
	},
	{
		path: "/i/:indexId/:viewId",
		name: "indexView",
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
		meta: {title: "Error", public: true}
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
	routes,
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

const init = async () => {
	const [config, user] = await Promise.all([
		store.getters["config/data"] || (await store.dispatch("config/data")),
		store.getters["user/data"] || (await store.dispatch("user/data"))
	]);

	return {config, user};
};

router.beforeEach(async (to, from, next) => {
	const {user, config} = await init();

	if (!config && to.name !== "error") {
		return next({name: "error", params: {status: 500}});
	}

	if (to.meta.public) {
		return go({to, next});
	}

	if (!user) {
		return store.dispatch("user/logout");
	}

	go({to, next});
});

export default router;
