import router from "@/modules/router";

export default {
	namespaced: true,

	state: {
		query: {}
	},

	mutations: {
		query(state, query) {
			state.query = query;
		}
	},

	actions: {

	},

	getters: {
		query(state) {
			return state.query;
		}
	}
};
