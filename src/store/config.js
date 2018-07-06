import axios from "@/modules/axios";
import {forEach, get, set} from "lodash";

export default {
	namespaced: true,

	state: {
		menu: [],
		tables: {},
		settings: {}
	},

	mutations: {
		data(state, data) {
			forEach(data, (val, key) => set(state, key, val));
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
			return state.menu;
		},
		settings(state) {
			return state.settings;
		},
		tables(state) {
			return state.tables;
		},
		title(state, getters) {
			return get(getters.settings, "title");
		},
		frontpage(state, getters) {
			return get(getters.settings, "frontpage");
		}
	}
};
