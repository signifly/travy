import axios from "@/modules/axios";
import router from "@/modules/router";

export default {
	namespaced: true,

	state: {
		auth: JSON.parse(localStorage.getItem("auth"))
	},

	mutations: {
		login(state, auth) {
			state.auth = auth;
			localStorage.setItem("auth", JSON.stringify(auth));
			router.push({name: "index"});
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
