<template>
	<div class="table-main" v-if="definitions">
		<div class="header" v-if="filters || search || actions">
			<filters
				v-if="filters || search"
				v-bind="[filters, {search}]"
				@filter="filter"
			/>
			<actions v-if="actions" v-bind="{actions, parentData}" @event="event" />
		</div>

		<div class="content">
			<box>
				<top v-bind="{modifiers, loading, title, meta}" @reset="reset" />

				<vTable
					ref="table"
					v-bind="{data, columns, subtable, defaults, batch, loading}"
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
			</box>
		</div>
	</div>
</template>

<script>
import Semaphore from "semaphore-async-await";
import {rStringProps} from "@/modules/utils";
import {merge, set} from "lodash";
import state from "./state";

import pagination from "./components/pagination";
import filters from "./components/filters";
import actions from "./components/actions";
import vTable from "./components/table";
import batch from "./components/batch";
import box from "@/components/box.vue";
import top from "./components/top";

const s = new Semaphore(1);

export default {
	components: {box, vTable, filters, actions, pagination, batch, top},
	props: {
		defsEndpoint: {type: Object, required: true},
		parentData: {type: Object, required: false},
		title: {type: Object, required: true}
	},
	data() {
		return {
			state,
			data: null,
			meta: null,
			halt: false,
			loading: false,
			definitions: null,
			selectedItems: []
		};
	},
	computed: {
		query: (t) => t.state.query,
		ws: (t) => t.definitions.ws,
		batch: (t) => t.definitions.batch,
		search: (t) => t.definitions.search,
		actions: (t) => t.definitions.actions,
		filters: (t) => t.definitions.filters,
		columns: (t) => t.definitions.columns,
		subtable: (t) => t.definitions.subtable,
		defaults: (t) => t.definitions.defaults,
		modifiers: (t) => t.definitions.modifiers,
		pagination: (t) => t.definitions.pagination,

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
			await s.acquire();

			if (actions.update) {
				let {data, item} = actions.update;
				// {"key1.key2": 1} ===> {key1: {key2: 1}}
				data = Object.entries(data).reduce(
					(obj, [key, val]) => set(obj, key, val),
					{}
				);
				const url = rStringProps({
					data: item,
					val: `${this.endpoint.url}/{id}`
				});
				await this.$axios.put(url, {data, modifier: this.modifiers});
				await this.getData({loading: false});
			}

			// if we're inside a view (parentData), the view will refresh the table component
			if (actions.refresh && !this.parentData) {
				const {definitions, data} = actions.refresh;
				if (definitions) await this.getDefinitions();
				if (data) await this.getData();
				this.unselect();
			}

			if (actions.halt) {
				this.halt = actions.halt.state;
			}

			if (done) await done();

			// emit to view
			this.$emit("event", {actions});

			s.release();
		},

		async filter({done}) {
			await this.getData({loading: false}); // don't show table loading indicator
			await done();
		},

		async getDefinitions() {
			const params = {
				...this.defsEndpoint.params,
				modifiers: this.query.modifiers
			};
			const {data} = await this.$axios.get(this.defsEndpoint.url, {params});
			this.definitions = data;
		},

		async getData({loading = true} = {}) {
			this.loading = loading;

			const params = merge({}, this.endpoint.params, {
				page: this.query.page,
				count: this.query.pagesize || 15,
				filter: this.query.filters,
				modifier: this.query.modifiers,
				sort: (() => {
					const sort = this.query.sort || this.defaults.sort;
					const order = sort.order === "descending" ? "-" : "";
					return `${order}${sort.prop}`;
				})()
			});

			const {
				data: {data, meta}
			} = await this.$axios.get(this.endpoint.url, {params});

			this.loading = false;
			this.data = data;
			this.meta = meta;
		}
	},
	async created() {
		this.state.query = this.$route.query;
		await this.getDefinitions();

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
.table-main {
	.header {
		margin-bottom: 1.5em;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
}
</style>
