import axios from "@/modules/axios";
import router from "@/modules/router";

export default {
	namespaced: true,

	state: {
		data: null,
		auth: JSON.parse(localStorage.getItem("auth"))
	},

	mutations: {
		data(state, {data}) {
			state.data = data;
		},
		authSet(state, {data}) {
			state.auth = data;
			localStorage.setItem("auth", JSON.stringify(data));
		},
		authDelete(state) {
			state.auth = null;
			localStorage.removeItem("auth");
		}
	},

	actions: {
		async login({commit, dispatch}, {form, route}) {
			const {data} = await axios.post(`${process.env.API}/v1/login`, form, {custom: true});
			commit("authSet", {data});
			await dispatch("data");
			router.push(route);
		},

		async logout({commit}, {post} = {}) {
			try {
				if (post) await axios.post("logout");
			} catch (err) {} finally {
				commit("authDelete");
				router.push({name: "login", params: {route: {path: window.location.pathname}}});
			}
		},

		async data({commit, dispatch, state, getters}) {
			if (state.auth) {
				const {data} = await axios.get("account");
				commit("data", data);
				return getters.data;
			}
		}
	},

	getters: {
		auth(state) {
			return state.auth;
		},
		data(state) {
			return state.data;
		}
	}
};
