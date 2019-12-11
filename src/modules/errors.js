import Vue from "vue";

export default () => {
	const {default: store} = require("@/store");

	Vue.config.errorHandler = (msg, vm = {}, trace) => {
		console.error("Custom vue error:", msg, vm.name, trace);

		store.dispatch("notify/send", {
			title: "Vue error",
			type: "error",
			message: msg
		});
	};

	Vue.config.warnHandler = (msg, vm = {}, trace) => {
		console.warn("Custom vue warning:", msg, vm.name, trace);

		store.dispatch("notify/send", {
			title: "Vue warning",
			type: "warning",
			message: msg
		});
	};
};
