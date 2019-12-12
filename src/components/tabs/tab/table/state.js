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

	async setQuery(query) {
		if (this.route.name === "index") {
			await router.replace({query}).catch(() => {});
		}
	},

	init({filters = {}, sort = {}}) {
		this.data = {
			filters: omitBy(filters.data, isEmpty),
			sort: sort.default
		};
	},

	async set(data) {
		await this.setQuery(mergeData(this.route.query, data));
		this.data = mergeData(this.data, data);
	},

	async resetFilters() {
		this.data.filters = {};
		await this.setQuery({...this.query, filters: undefined});
	}
});
