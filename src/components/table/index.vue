<template>
	<div class="table" v-if="definitions">
		<div class="header" v-if="filters || actions">
			<filters
				v-if="filters"
				v-bind="filters"
				:loading.sync="loading"
				@getData="getData"
			/>

			<div class="right">
				<sort v-if="sort" v-bind="sort" @getData="getData" />
				<actions v-if="actions" v-bind="{actions, parentData}" @event="event" />
			</div>
		</div>

		<div class="content">
			<top v-bind="{modifiers, loading, meta}" @reset="reset" />
			<tableEl
				ref="table"
				v-bind="{
					selected,
					endpoint,
					columns,
					loading,
					expand,
					data
				}"
				@getData="getData"
				@event="event"
			/>
			<pagination
				v-if="meta && pagination"
				v-bind="[meta, {loading}]"
				@getData="getData"
			/>
			<batch v-bind="[batch, {selected}]" @event="event" />
		</div>
	</div>
</template>

<script>
import pagination from "./components/pagination";
import {rStringProps} from "@/modules/utils";
import filters from "./components/filters";
import actions from "./components/actions";
import tableEl from "./components/table";
import batch from "./components/batch";
import sort from "./components/sort";
import top from "./components/top";
import {merge, get} from "lodash";
import state from "./state";

export default {
	components: {tableEl, filters, actions, pagination, sort, batch, top},
	props: {
		definitions: {type: Object, required: true},
		parentData: {type: Object, required: false}
	},
	data() {
		return {
			data: [],
			meta: null,
			halt: false,
			loading: false,
			metadata: null,
			selected: {
				items: [],
				active: this.definitions.batch || true
			}
		};
	},
	computed: {
		query: () => state.query,
		sort: (t) => t.definitions.sort,
		batch: (t) => t.definitions.batch,
		expand: (t) => t.definitions.expand,
		actions: (t) => t.definitions.actions,
		filters: (t) => t.definitions.filters,
		columns: (t) => t.definitions.columns,
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
		async getDefinitions() {
			console.log("get definitions");
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

		async getData({loading = true} = {}) {
			this.loading = loading;

			const params = merge({}, this.endpoint.params, {
				count: this.query.pagesize || 15,
				modifier: this.query.modifiers,
				filter: this.query.filters,
				sort: this.query.sort,
				page: this.query.page
			});

			const {
				data: {data, meta, metadata}
			} = await this.$axios.get(this.endpoint.url, {params});

			this.metadata = metadata;
			this.loading = false;
			this.data = data;
			this.meta = meta;
		}
	},
	async created() {
		state.initQuery(this.definitions);
		await this.getData();

		if (this.ws) {
			this.$ws.on(this.ws.channel, () => {
				if (!this.halt) this.getData();
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.table {
	.header {
		display: flex;
		align-items: center;
		margin: 0 1.5em 1.5em;
		justify-content: space-between;

		.right {
			display: flex;
			align-items: center;
		}
	}
}
</style>
