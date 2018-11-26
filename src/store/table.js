import router from "@/modules/router";

export default {
	namespaced: true,

	actions: {
		query({commit}, {type = "push", query}) {
			if (router.currentRoute.name === "table") {
				router[type]({query});
			} else {
				commit("router/query", query, {root: true});
			}
		}
	}
};
