import axios from "@/modules/axios";
import {forEach, set} from "lodash";

export default {
	namespaced: true,

	state: {
		menu: [],
		tables: {},
		customs: {},
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
		tables(state) {
			return state.tables;
		},
		customs(state) {
			return state.customs;
		},
		settings(state) {
			return state.settings;
		},
		frontpage(state, getters) {
			return getters.settings.frontpage;
		},
		title(state, getters) {
			return getters.settings.title || "Travy";
		}
	}
};
