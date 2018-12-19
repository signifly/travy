import Vuex from "vuex";

import base from "./base";
import user from "./user";
import config from "./config";
import notify from "./notify";

export default new Vuex.Store({
	strict: true,
	modules: {
		base,
		user,
		config,
		notify
	}
});
