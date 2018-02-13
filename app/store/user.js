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
			router.push({name: "login"});
		}
	},

	actions: {
		async logout({commit}) {
			await axios.post("logout");
			commit("logout");
		}
	},

	getters: {
		auth(state) {
			return state.auth;
		}
	}
};
