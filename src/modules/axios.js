import router from "./router";
import store from "@/store";
import {get} from "lodash";
import axios from "axios";
import Vue from "vue";
import qs from "qs";


const api = axios.create({
	baseURL: `${Vue.prototype.$plugin.api}/v1/admin`,
	paramsSerializer: (params) => qs.stringify(params)
});

api.interceptors.request.use(config => {
	const auth = store.getters["user/auth"];
	if (auth) config.headers.common["Authorization"] = `${auth.token_type} ${auth.access_token}`;
	return config;
});


api.interceptors.response.use(res => res, (err) => {
	const res = err.response;
	console.log("err", err);
	console.log("res", res);

	if (!res) {
		console.log("no server response");
		return router.replace({name: "error", params: {status: 500}});
	}

	const message = get(res, "data.message");
	const customErr = res.config.customErr;
	const status = res.status;


	if (customErr) { // if the request catches the error itself, stop global error handling.
		return Promise.reject({
			...res.data,
			status
		});
	}

	if (status === 401 && !res.config.url.endsWith("logout")) { // if token is invalid, logout
		return store.dispatch("user/logout");
	}

	store.dispatch("notify/send", {
		title: `Error ${status}`,
		type: "error",
		message
	});

	return Promise.reject(err);
});


export default api;
