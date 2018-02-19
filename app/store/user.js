import axios from "@/modules/axios";
import router from "@/modules/router";

export default {
	namespaced: true,

	state: {
		auth: JSON.parse(localStorage.getItem("auth"))
	},

	mutations: {
		login(state, {data, route}) {
			state.auth = data;
			localStorage.setItem("auth", JSON.stringify(data));
			router.push(route);
		},
		logout(state) {
			state.auth = null;
			localStorage.removeItem("auth");
			router.push({name: "login", params: {route: {path: window.location.pathname}}});
		}
	},

	actions: {
		async logout({commit}) {
			try {
				await axios.post("logout");
			} catch (err) {} finally {
				commit("logout");
			}
		}
	},

	getters: {
		auth(state) {
			return state.auth;
		}
	}
};
