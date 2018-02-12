import axios from "@/modules/axios";
import router from "@/modules/router";

export default {
	namespaced: true,

	state: {
		auth: JSON.parse(localStorage.getItem("auth"))
	},

	mutations: {
		login(state, auth) {
			localStorage.setItem("auth", JSON.stringify(auth));
			state.auth = auth;
		},
		logout(state) {
			localStorage.removeItem("auth");
			state.auth = null;
		}
	},

	actions: {
		async logout({commit}) {
			await axios.post("logout");
			commit("logout");
			router.push({name: "login"});
		}
	},

	getters: {
		auth(state) {
			return state.auth;
		}
	}
};
