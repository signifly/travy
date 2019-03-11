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
		menu(state, {data}) {
			return data && data.menu;
		},
		tables(state, {data}) {
			return data && data.tables;
		},
		customs(state, {data}) {
			return data && data.customs;
		},
		settings(state, {data}) {
			return data && data.settings;
		},
		dashboards(state, {data}) {
			return data && data.dashboards;
		},
		frontpage(state, {settings}) {
			return settings && settings.frontpage;
		},
		wsKey(state, {settings}) {
			return settings && settings.websockets_key;
		},
		title(state, {settings}) {
			return (settings && settings.title) || "Travy";
		}
	}
};
