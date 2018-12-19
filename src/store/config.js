import axios from "@/modules/axios";
import {get} from "lodash";

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
				const {data} = await axios.get("definitions/config", {customErr: true});
				commit("data", data);
			} catch(err) {
				// error
			}
		}
	},

	getters: {
		data(state) {
			return state.data;
		},
		menu(state) {
			return get(state.data, "menu", []);
		},
		tables(state) {
			return get(state.data, "tables", {});
		},
		customs(state) {
			return get(state.data, "customs", {});
		},
		settings(state) {
			return get(state.data, "settings", {});
		},
		frontpage(state, getters) {
			return getters.settings.frontpage;
		},
		title(state, getters) {
			return getters.settings.title || "Travy";
		}
	}
};
