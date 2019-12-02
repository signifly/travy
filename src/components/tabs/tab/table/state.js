import {mergeData} from "@/modules/utils";
import {isEmpty, omitBy} from "lodash";
import router from "@/modules/router";

export default () => ({
	data: {},

	get route() {
		return router.currentRoute;
	},

	get query() {
		return mergeData(this.data, this.route.query);
	},

	set query(query) {
		console.log(query.filters);
		if (this.route.name === "index") {
			router.replace({query}).catch(() => {});
		}
	},

	init({filters = {}, sort = {}}) {
		this.data = {
			filters: omitBy(filters.data, isEmpty),
			sort: sort.default
		};
	},

	set(data) {
		this.query = mergeData(this.route.query, data);
		this.data = mergeData(this.data, data);
	},

	resetFilters() {
		this.data.filters = {};
		this.query = {...this.query, filters: undefined};
	}
});
