import {api} from "@/modules/axios";

export default {
	namespaced: true,

	state: {
		data: undefined
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
				return data;
			} catch (err) {
				// error
			}
		}
	},

	getters: {
		data(state) {
			return state.data;
		},
		ws(state, {data = {}}) {
			return data.websockets;
		},
		theme(state, {data = {}}) {
			return data.theme;
		},
		header(state, {data = {}}) {
			return data.header;
		},
		title(state, {data = {}}) {
			return data.title || "Travy";
		}
	}
};
