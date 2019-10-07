import {api} from "@/modules/axios";

export default {
	namespaced: true,

	state: {
		data: null
	},

	mutations: {
		data(state, data) {
			state.data = data;
		}
	},

	actions: {
		async data({commit}) {
			try {
				const {data} = await api.get("definitions/config", {customErr: true});
				commit("data", data);
			} catch (err) {
				// error
			}
		}
	},

	getters: {
		data(state) {
			return state.data;
		},
		ws(state, {data}) {
			return data.websockets;
		},
		title(state, {data}) {
			return data.title || "Travy";
		}
	}
};
