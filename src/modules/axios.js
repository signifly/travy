import {get} from "lodash";
import axios from "axios";
import router from "./router";
import qs from "qs";

import store from "../store";

const api = axios.create({
	baseURL: `${process.env.API}/v1`,
	paramsSerializer: (params) => qs.stringify(params)
});

api.interceptors.request.use(config => {
	const auth = store.getters["user/auth"];
	if (auth) config.headers.common["Authorization"] = `${auth.token_type} ${auth.access_token}`;

	return config;
}, (error) => {
	return Promise.reject(error);
});


api.interceptors.response.use(res => {
	return res;
}, (error) => {
	const res = error.response;
	console.log(error, res);

	if (get(res, "config.custom")) { // if the request catches the error itself, stop global error handling.
		return Promise.reject(error);
	}

	if (get(res, "status") === 401 && !get(res, "config.url").endsWith("logout")) { // if token is invalid, logout
		store.dispatch("user/logout");
	}

	if (!res) {
		console.log("no server response");
		return router.replace({name: "error"});
	}

	store.dispatch("notify/send", {
		message: get(res, "data.message"),
		title: `Error ${get(res, "status")}`,
		type: "error"
	});

	return Promise.reject(error);
});


export default api;
