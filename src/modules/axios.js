import * as meta from "./meta";
import router from "./router";
import store from "@/store";
import {get} from "lodash";
import axios from "axios";
import Vue from "vue";
import qs from "qs";


const error = ({status, message}) => {
	store.dispatch("notify/send", {
		title: `Error ${status}`,
		type: "error",
		message
	});
};


const api = axios.create({
	baseURL: `${Vue.prototype.$settings.api}/v1/admin`,
	paramsSerializer: (params) => qs.stringify(params)
});


api.interceptors.request.use(config => {
	const auth = JSON.parse(localStorage.getItem("auth"));
	if (auth) config.headers.common["Authorization"] = `${auth.token_type} ${auth.access_token}`;

	// if $meta/* endpoint throw error
	if (config.url.includes("$meta")) throw {meta: "items"};

	return config;
});


api.interceptors.response.use(res => res, (err) => {
	// return meta data if meta error was thrown
	if (err.meta) return {data: meta[err.meta]};

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
		if (status === 500) error({status, message});

		return Promise.reject({
			...res.data,
			status
		});
	}

	if (status === 401 && !res.config.url.endsWith("logout")) { // if token is invalid, logout
		return store.dispatch("user/logout");
	}

	error({status, message});

	return Promise.reject(err);
});


export default api;
