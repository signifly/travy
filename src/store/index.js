import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import user from "./user";
import config from "./config";

const store = new Vuex.Store({
	strict: true,
	modules: {
		user,
		config
	}
});

export default store;
