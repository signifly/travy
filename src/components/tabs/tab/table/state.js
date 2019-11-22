import router from "@/modules/router";

export default () => ({
	query: {},

	initQuery({filters = {}, sort = {}}) {
		this.setQuery({
			type: "replace",
			query: {
				sort: sort.default,
				filters: filters.data,
				...router.currentRoute.query
			}
		});
	},

	setQuery({type, query}) {
		this.query = query;

		if (router.currentRoute.name === "index") {
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
});
