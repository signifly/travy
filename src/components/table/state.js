import router from "@/modules/router";

export default {
	query: {},

	initQuery({filters = {}, sort = {}}) {
		const query = {
			...router.currentRoute.query,
			filters: filters.data,
			sort: sort.default
		};

		this.setQuery({type: "replace", query});
	},

	setQuery({type, query}) {
		this.query = query;

		if (router.currentRoute.name === "table") {
			router[type]({query}).catch(() => {});
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
