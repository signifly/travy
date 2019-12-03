import {setup} from "@/lib";

const error = console.error;
console.error = function(message) {
	error.apply(console, arguments); // keep default behaviour
	throw message instanceof Error ? message : new Error(message);
};

setup({
	api: "https://localhost",
	init({store}) {
		store.commit("config/data", {locale: "en"});
	}
});
