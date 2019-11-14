export default {
	namespaced: true,

	state: {
		meta: {
			title: "Travy"
		}
	},

	mutations: {
		meta(state, meta) {
			state.meta = {...state.meta, ...meta};
			document.title = state.meta.title;
		}
	},

	actions: {
		meta({commit, rootGetters}, {title}) {
			const siteTitle = rootGetters["config/title"];
			const newTitle = title ? `${title} - ${siteTitle}` : siteTitle;
			commit("meta", {title: newTitle});
		}
	},

	getters: {
		ready(state, getters, rootState, rootGetters) {
			return !!(rootGetters["config/data"] && rootGetters["user/data"]);
		}
	}
};
