<template>
	<div class="table" v-if="definitions">
		<div class="header" v-if="filters || search || actions">
			<filters
				v-if="filters || search"
				v-bind="[filters, {search}]"
				@filter="filter"
			/>
			<actions v-if="actions" v-bind="{actions, parentData}" @event="event" />
		</div>

		<div class="content">
			<top v-bind="{modifiers, loading, meta}" @reset="reset" />
			<vTable
				ref="table"
				v-bind="{
					data,
					metadata,
					columns,
					subtable,
					batch,
					loading,
					endpoint,
					modifiers
				}"
				@select="select"
				@getData="getData"
				@event="event"
			/>
			<pagination
				v-if="meta && pagination"
				v-bind="[meta, {loading}]"
				@getData="getData"
			/>
			<batch
				v-bind="[batch, {selectedItems}]"
				@unselect="unselect"
				@event="event"
			/>
		</div>
	</div>
</template>

<script>
import {rStringProps} from "@/modules/utils";
import {merge, get} from "lodash";
import state from "./state";

import pagination from "./components/pagination";
import filters from "./components/filters";
import actions from "./components/actions";
import vTable from "./components/table";
import batch from "./components/batch";
import top from "./components/top";

export default {
	components: {vTable, filters, actions, pagination, batch, top},
	props: {
		definitions: {type: Object, required: true},
		parentData: {type: Object, required: false}
	},
	data() {
		return {
			state,
			data: [],
			meta: null,
			halt: false,
			loading: false,
			metadata: null,
			// definitions: null,
			selectedItems: []
		};
	},
	computed: {
		query: (t) => t.state.query,
		batch: (t) => t.definitions.batch,
		search: (t) => t.definitions.search,
		actions: (t) => t.definitions.actions,
		filters: (t) => t.definitions.filters,
		columns: (t) => t.definitions.columns,
		subtable: (t) => t.definitions.subtable,
		modifiers: (t) => t.definitions.modifiers,
		pagination: (t) => t.definitions.pagination,

		ws() {
			return rStringProps({
				val: get(this.definitions, "ws"),
				data: this.parentData
			});
		},

		endpoint() {
			return rStringProps({
				val: this.definitions.endpoint,
				data: this.parentData
			});
		}
	},
	methods: {
		select(items) {
			this.selectedItems = items;
		},

		unselect() {
			this.$refs.table.unselect();
		},

		async reset({done} = {}) {
			this.unselect();
			await this.getDefinitions();
			await this.getData();
			if (done) await done();
		},

		async event({actions, done}) {
			if (actions.refresh) {
				const {definitions, data} = actions.refresh;
				if (definitions) await this.getDefinitions();
				if (data) await this.getData();
				this.unselect();
			}

			if (actions.halt) {
				this.halt = actions.halt.state;
			}

			if (done) await done();
		},

		async filter({done}) {
			await this.getData({loading: false}); // don't show table loading indicator
			await done();
		},

		// async getDefinitions() {
		// 	const params = {
		// 		...this.defsEndpoint.params,
		// 		modifiers: this.query.modifiers
		// 	};
		// 	const {data} = await this.$axios.get(this.defsEndpoint.url, {params});
		// 	this.definitions = data;
		// },

		async getData({loading = true} = {}) {
			this.loading = loading;

			const params = merge({}, this.endpoint.params, {
				page: this.query.page,
				sort: this.query.sort,
				count: this.query.pagesize || 15,
				filter: this.query.filters,
				modifier: this.query.modifiers
			});

			const {
				data: {data, meta, metadata}
			} = await this.$axios.get(this.endpoint.url, {params});

			this.loading = false;
			this.metadata = metadata;
			this.data = data;
			this.meta = meta;
		}
	},
	async created() {
		this.state.query = this.$route.query;
		// await this.getDefinitions();
		await this.getData();

		if (this.ws) {
			this.$ws.on(this.ws.channel, () => {
				if (!this.halt) this.getData();
			});
		}
	},
	beforeDestroy() {
		if (this.ws) {
			this.$ws.stop(this.ws.channel);
		}
	}
};
</script>

<style lang="scss" scoped>
.table {
	.header {
		margin-bottom: 1.5em;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
}
</style>
