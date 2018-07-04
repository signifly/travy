import axios from "@/modules/axios";
import {get} from "lodash";

export default {
	namespaced: true,

	state: {
		data: {}
	},

	mutations: {
		data(state, data) {
			state.data = data;
		}
	},

	actions: {
		async data({commit}) {
			try {
				const {data} = await axios.get("definitions/config");
				commit("data", data);
			} catch(err) {
				console.log(err);
			}
		}
	},

	getters: {
		menu(state) {
			return state.data.menu;
		},
		settings(state) {
			return state.data.settings;
		},
		tables(state) {
			return state.data.tables;
		},
		title(state, getters) {
			return get(getters.settings, "title");
		}
	}
};
