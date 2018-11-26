import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import base from "./base";
import user from "./user";
import table from "./table";
import router from "./router";
import config from "./config";
import notify from "./notify";

const store = new Vuex.Store({
	strict: true,
	modules: {
		base,
		user,
		table,
		router,
		config,
		notify
	}
});

export default store;
