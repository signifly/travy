import {cloneDeep, get} from "lodash";
import router from "./router";
import store from "@/store";
import axios from "axios";
import Vue from "vue";
import qs from "qs";

export const api = (() => {
	const error = ({status, message}) => {
		store.dispatch("notify/send", {
			title: `Error ${status}`,
			type: "error",
			message
		});
	};

	const api = axios.create({
		baseURL: Vue.prototype.$opts.api,
		paramsSerializer: (params) => qs.stringify(params)
	});

	api.interceptors.request.use((config) => {
		const auth = JSON.parse(localStorage.getItem("auth"));
		config.headers["X-Travy"] = true;

		if (auth) {
			config.headers.common["Authorization"] = `
				${auth.token_type} ${auth.access_token}
			`;
		}

		return config;
	});

	api.interceptors.response.use(
		(res) => res,
		async (err) => {
			const auth = JSON.parse(localStorage.getItem("auth"));
			const res = err.response;
			console.error("err", err);
			console.error("res", res);

			if (!res) {
				console.error("no server response");
				return router.replace({name: "error", params: {status: 500}});
			}

			const message = get(res, "data.message");
			const customErr = res.config.customErr;
			const status = res.status;

			// token expired
			if (status === 401 && auth) {
				try {
					const {data} = await axios.post(
						`${Vue.prototype.$opts.api}/refresh`,
						null,
						{
							headers: {
								Authorization: `${auth.token_type} ${auth.access_token}`
							}
						}
					);

					// save new auth
					localStorage.setItem("auth", JSON.stringify(data));

					// remove old auth from current request
					delete err.config.headers["Authorization"];

					// retry request
					return await api.request(err.config);
				} catch (err) {
					store.dispatch("user/logout");
					return Promise.reject(err);
				}
			}

			// if the request catches the error itself, stop global error handling.
			if (customErr) {
				if (status === 500) error({status, message});

				return Promise.reject({
					...res.data,
					status
				});
			}

			error({status, message});
			return Promise.reject(err);
		}
	);

	return api;
})();

export const metaApi = (() => {
	const api = axios.create({
		paramsSerializer: (params) => qs.stringify(params)
	});

	api.interceptors.request.use((config) => {
		throw {config};
	});

	api.interceptors.response.use(
		(res) => res,
		({config}) => {
			const {method, data, url, params} = config;
			const obj = {};

			if (params) {
				obj.params = params;
			}

			if (["put", "post"].includes(method)) {
				obj.req = cloneDeep(data);
			}

			const item = (i) => ({
				url: "https://picsum.photos/id/11/500/500",
				name: `item${i}`,
				id: i
			});

			// single item
			if (url.includes("items/")) {
				obj.res = {data: {data: item(1)}};

				// multiple items
			} else if (url.includes("items")) {
				obj.res = {data: {data: [...Array(6)].map((x, i) => item(i))}};
			}

			console.log(obj);
			return obj.res;
		}
	);

	return api;
})();
