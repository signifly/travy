<template>
	<div class="table" v-if="definitions">
		<div class="header" :class="{data}" v-if="filters || actions || sort">
			<filters
				v-if="filters"
				v-bind="[filters, {state}]"
				:loading.sync="loading"
				@getData="getData"
			/>

			<div class="right">
				<sort v-if="sort" v-bind="[sort, {state}]" @getData="getData" />
				<actions
					v-if="actions"
					v-bind="{actions, data: parentData}"
					@event="event"
				/>
			</div>
		</div>

		<div class="content">
			<tableEl
				@getData="getData"
				:data.sync="data"
				@event="event"
				:key="update"
				v-if="data"
				ref="table"
				v-bind="{
					selected,
					endpoint,
					columns,
					loading,
					expand,
					state,
					sort
				}"
			/>

			<pagination
				v-bind="[meta, {loading, state}]"
				v-if="meta && pagination"
				@getData="getData"
			/>

			<panel
				v-bind="{endpoint, selected, batch, meta, state, sort}"
				@event="event"
				v-if="batch"
			/>

			<Link v-if="link && data" v-bind="{link}" />
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
import Link from "./components/link";
import {merge, get} from "lodash";
import state from "./state";

export default {
	components: {tableEl, filters, actions, pagination, sort, panel, Link},
	props: {
		definitions: {type: Object, required: true},
		parentData: {type: Object, required: false}
	},
	data() {
		return {
			metadata: null,
			loading: false,
			state: state(),
			halt: false,
			meta: null,
			data: null,
			update: 0,
			selected: {
				items: [],
				active: this.definitions.batch
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
		link: (t) => t.definitions.link,
		query: (t) => t.state.query,

		sort() {
			const {sort} = this.definitions;

			return (
				sort && {
					...sort,
					move: sort.items.find((x) => {
						return x.manual && this.query.sort === x.value;
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

			this.data = data.map((x) => ({...x, $parentData: this.parentData}));
			this.metadata = metadata;
			this.loading = false;
			this.meta = meta;
			this.update++;
		}
	},
	async created() {
		this.state.init(this.definitions);
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
	position: relative;

	.header {
		align-items: center;
		padding: 1.5em;
		display: flex;

		&.data {
			border-bottom: 1px solid $blue6;
		}

		.right {
			display: flex;
			margin-left: auto;
			align-items: center;
		}
	}
}
</style>
