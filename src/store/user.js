import router from "@/modules/router";
import axios from "@/modules/axios";
import ws from "@/modules/ws";

export default {
	namespaced: true,

	state: {
		data: null
	},

	mutations: {
		data(state, {data}) {
			state.data = data;
		},
		authSet(state, {data}) {
			localStorage.setItem("auth", JSON.stringify(data));
		},
		logout(state) {
			localStorage.removeItem("auth");
			state.data = null;
		}
	},

	actions: {
		async login({commit, dispatch}, {form, route}) {
			try {
				const {data} = await axios.post("login", form, {customErr: true});
				commit("authSet", {data});

				await dispatch("data", {customErr: true});

				router.push(route);
			} catch (err) {
				commit("logout");
				return Promise.reject(err);
			}
		},

		async logout({commit}, {post} = {}) {
			try {
				if (post) await axios.post("logout");
			} catch (err) {
				// error
			} finally {
				ws.close();
				commit("logout");
				router.push({
					name: "login",
					params: {route: {path: window.location.pathname}}
				});
			}
		},

		async resetPassword(ctx, {form}) {
			return await axios.post("password/email", form, {customErr: true});
		},

		async data({commit, getters}, {customErr} = {}) {
			if (localStorage.getItem("auth")) {
				try {
					const {data} = await axios.get("account", {customErr});
					commit("data", data);
					return getters.data;
				} catch (err) {
					// error
				}
			}
		}
	},

	getters: {
		data(state) {
			return state.data;
		}
	}
};
