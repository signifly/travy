import {get} from "lodash";
import axios from "axios";
import {Notification} from "element-ui";
import store from "../store";

const api = axios.create({
	baseURL: "https://api.sikane.signifly.com/v1/"
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

	console.log(res);

	if (get(res, "config.custom")) return Promise.reject(error); // if the request catches the error itself, stop global error handling.

	Notification({
		title: "Error",
		message: res.data.message,
		type: "error"
	});

	return Promise.reject(error);
});

export default api;
