import router from "@/modules/router";
import {api} from "@/modules/axios";
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
		async data({getters, commit, dispatch}, {customErr} = {}) {
			if (localStorage.getItem("auth")) {
				try {
					commit("data", (await api.get("account", {customErr})).data);
					dispatch("notifications");
					return getters.data;
				} catch (err) {
					// error
				}
			}
		},

		async login({commit, dispatch}, {form, route}) {
			try {
				const {data} = await api.post("login", form, {customErr: true});
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
				if (post) await api.post("logout");
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

		notifications({rootGetters, getters, dispatch}) {
			const active = rootGetters["config/ws"];
			const user = getters["data"];

			if (active) {
				ws.on(`users.${user.id}`, ({data}) => {
					const payload = {...data, type: data.status};
					dispatch("notify/send", payload, {root: true});
				});
			}
		},

		async resetPassword(ctx, {form}) {
			return await api.post("password/email", form, {customErr: true});
		}
	},

	getters: {
		data(state) {
			return state.data;
		}
	}
};
