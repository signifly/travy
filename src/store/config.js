import axios from "@/modules/axios";
import {forEach, set} from "lodash";

export default {
	namespaced: true,

	state: {
		menu: [],
		tables: {},
		settings: {}
	},

	mutations: {
		data(state, data) {
			state.loaded = true;
			forEach(data, (val, key) => set(state, key, val));
		}
	},

	actions: {
		async data({commit}) {
			try {
				const {data} = await axios.get("definitions/config", {customErr: true});
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
			return getters.settings.title || "Travy";
		},
		frontpage(state, getters) {
			return getters.settings.frontpage;
		}
	}
};
