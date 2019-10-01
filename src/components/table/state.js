import router from "@/modules/router";

export default {
	query: {},

	initQuery({query}) {
		this.query = query;
	},

	setQuery({type, query}) {
		this.query = query;

		if (router.currentRoute.name === "table") {
			router[type]({query});
		}
	},

	mergeQuery({type, query}) {
		this.setQuery({
			type,
			query: {
				...this.query,
				...query
			}
		});
	}
};
