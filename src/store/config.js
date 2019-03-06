import axios from "@/modules/axios";

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
		menu({data}) {
			return data && data.menu;
		},
		tables({data}) {
			return data && data.tables;
		},
		customs({data}) {
			return data && data.customs;
		},
		settings({data}) {
			return data && data.settings;
		},
		dashboards({data}) {
			return data && data.dashboards;
		},
		frontpage(state, {settings}) {
			return settings && settings.frontpage;
		},
		title(state, getters) {
			return getters.settings.title || "Travy";
		}
	}
};
