import router from "@/modules/router";

export default {
	query: {},

	setQuery({type, query}) {
		this.query = query;

		if (router.currentRoute.name === "table") {
			router[type]({query});
		}
	}
};
