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
				<actions
					v-if="actions"
					v-bind="{actions, data: parentData}"
					@event="event"
				/>
			</div>
		</div>

		<div class="content">
			<top v-bind="{loading, meta}" />
			<tableEl
				v-if="data"
				ref="table"
				v-bind="{
					selected,
					endpoint,
					columns,
					loading,
					expand,
					sort,
					data
				}"
				@getData="getData"
				@event="event"
			/>
			<pagination v-if="meta" v-bind="[meta, {loading}]" @getData="getData" />
			<panel v-bind="{endpoint, selected, batch, meta, sort}" @event="event" />
		</div>
	</div>
</template>

<script>
import pagination from "./components/pagination";
import actions from "@/components/page-actions";
import {rStringProps} from "@/modules/utils";
import filters from "./components/filters";
import tableEl from "./components/table";
import panel from "./components/panel";
import sort from "./components/sort";
import top from "./components/top";
import {merge, get} from "lodash";
import state from "./state";

export default {
	components: {tableEl, filters, actions, pagination, sort, panel, top},
	props: {
		definitions: {type: Object, required: true},
		parentData: {type: Object, required: false}
	},
	data() {
		return {
			metadata: null,
			loading: false,
			halt: false,
			meta: null,
			data: null,
			selected: {
				items: [],
				active: this.definitions.batch || true
			}
		};
	},
	computed: {
		pagination: (t) => t.definitions.pagination,
		columns: (t) => t.definitions.columns,
		filters: (t) => t.definitions.filters,
		actions: (t) => t.definitions.actions,
		expand: (t) => t.definitions.expand,
		batch: (t) => t.definitions.batch,
		query: () => state.query,

		sort() {
			const {sort} = this.definitions;

			return (
				sort && {
					...sort,
					move: sort.items.find((x) => {
						return x.manual && this.$route.query.sort === x.value;
					})
				}
			);
		},

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
		async event({actions, done}) {
			if (actions.refresh) {
				await this.getData();
				this.selected.items = [];
			}

			if (actions.halt) {
				this.halt = actions.halt.state;
			}

			if (done) done();
		},

		async getData() {
			this.loading = true;

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
		height: 40px;
		display: flex;
		align-items: center;
		margin: 0 1.5em 1.5em;

		.right {
			display: flex;
			margin-left: auto;
			align-items: center;
		}
	}
}
</style>
