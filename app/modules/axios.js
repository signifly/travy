import Vue from "vue";
import axios from "axios";
import {get} from "lodash";
import {Notification} from "element-ui";

const api = axios.create({
	baseURL: "https://api.sikane.signifly.com/v1/"
});

api.interceptors.response.use(res => {
	return res;
}, err => {
	if (err.response) console.log(err.response);
	if (get(err, "response.config.custom")) return Promise.reject(err); // if the request catches the error itself, stop global error handling.

	Notification({
		title: "Error",
		message: "🔥 fire 🔥",
		type: "error"
	});

	return Promise.reject(err);
});

Vue.prototype.$http = api;
