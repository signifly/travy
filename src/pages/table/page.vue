<template>
	<div class="table-main" v-if="definitions">

		<div class="header">
			<filters v-bind="[filters, {search}]" @filter="filter"/>
			<actions v-if="actions" v-bind="{actions, parentData}" @fieldA="fieldA"/>
		</div>

		<div class="content">
			<box>
				<top v-bind="{modifiers, loading, title, meta}" @refresh="refresh"/>

				<vTable
					ref="vTable"
					v-bind="{data, columns, defaults, batch, loading}"
					@select="select"
					@getData="getData"
					@fieldA="fieldA"
				/>

				<pagination v-if="meta" v-bind="[meta, {loading}]" @getData="getData"/>
				<batch v-if="selectedItems.length > 0 && batch" v-bind="[batch, {selectedItems}]" @unselect="unselect" @fieldA="fieldA"/>
			</box>
		</div>
	</div>
</template>

<script>
import Semaphore from "semaphore-async-await";
import {rStringProps} from "@/modules/utils";
import {omit} from "lodash";

import state from "./state";

import box from "@/components/box.vue";
import pagination from "./components/pagination"
import filters from "./components/filters";
import actions from "./components/actions";
import vTable from "./components/table";
import batch from "./components/batch";
import top from "./components/top";

const s = new Semaphore(1);

export default {
	components: {box, vTable, filters, actions, pagination, batch, top},
	props: {
		defsEndpoint: {type: Object, required: true},
		parentData: {type: Object, required: false},
		title: {type: String, required: false}
	},
	data() {
		return {
			state, // make reactive
			data: null,
			meta: null,
			loading: false,
			definitions: null,
			selectedItems: []
		}
	},
	computed: {
		query: (t) => t.state.query,
		batch: (t) => t.definitions.batch,
		search: (t) => t.definitions.search,
		actions: (t) => t.definitions.actions,
		filters: (t) => t.definitions.filters,
		columns: (t) => t.definitions.columns,
		defaults: (t) => t.definitions.defaults,
		endpoint: (t) => t.definitions.endpoint,
		modifiers: (t) => t.definitions.modifiers
	},
	methods: {
		select(items) {
			this.selectedItems = items;
		},

		unselect() {
			this.$refs.vTable.unselect();
		},

		async refresh({done} = {}) {
			this.unselect();
			await this.getDefinitions();
			await this.getData();
			if (done) await done()
		},

		async fieldA({action, data, item, done}) {
			const actions = {
				refresh: async () => {
					await this.refresh();
				},

				refreshData: async () => {
					await this.getData();
				},

				update: async ({item, data}) => {
					await s.acquire();
					const modifiers = this.modifiers ? this.modifiers.map(x => omit(x, "options")) : undefined;
					const url = rStringProps({data: item, string: `${this.endpoint.url}/{id}`});
					await this.$axios.put(url, {...data, modifiers});
					await this.getData({loading: false});
					s.release();
				}
			};

			try {
				await actions[action]({data, item});
			} catch(err) {
				// error
			} finally {
				if (done) await done();
			}
		},

		async filter({done}) {
			await this.getData({loading: false}); // don't show table loading indicator
			await done();
		},

		async getDefinitions() {
			const params = {...this.defsEndpoint.params, modifiers: this.query.modifiers};

			const {data} = await this.$axios.get(this.defsEndpoint.url, {params});
			this.definitions = data;
		},

		async getData({loading} = {loading: true}) {
			this.loading = loading;

			const params = {
				...this.endpoint.params,
				page: this.query.page,
				count: this.query.pagesize,
				filter: this.query.filters,
				modifier: this.query.modifiers,
				sort: (() => {
					const sort = this.query.sort || this.defaults.sort;
					const order = sort.order === "descending" ? "-" : "";
					return `${order}${sort.prop}`;
				})()
			};

			const {data: {data, meta}} = await this.$axios.get(this.endpoint.url, {params});
			this.data = data;
			this.meta = meta;

			this.loading = false;
		}
	},
	created() {
		this.state.query = this.$route.query;
		this.getDefinitions();
	}
};
</script>

<style lang="scss" scoped>
.table-main {
	.header {
		margin-bottom: 1.5em;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
}
</style>
