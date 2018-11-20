import store from "../store";
import Vue from "vue";

Vue.config.errorHandler = (msg, vm = {}, trace) => {
	console.error("Custom vue error:", msg, vm.name, trace);

	store.dispatch("notify/send", {
		message: msg,
		title: "Vue error",
		type: "error"
	});
};

Vue.config.warnHandler = (msg, vm = {}, trace) => {
	console.warn("Custom vue warning:", msg, vm.name, trace);

	store.dispatch("notify/send", {
		message: msg,
		title: "Vue warning",
		type: "warning"
	});
};
