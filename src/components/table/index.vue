<template>
	<div class="table-main" v-if="definitions">

		<div class="header">
			<vFilters v-bind="[filters, {search}]" @filter="filter" />
			<vActions v-bind="{actions}" @fieldA="fieldA" />
		</div>

		<div class="content">
			<box>
				<div class="top">
					<div class="info">
						<div class="title">{{title}}</div>
						<div class="total" v-if="pagination">{{pagination.total}}</div>
						<transition name="loading">
							<div class="loading" v-if="loading">
								<i class="el-icon-loading"/>
							</div>
						</transition>
					</div>
					<vModifiers v-if="modifiers" v-bind="{modifiers}" @refreshAll="refreshAll" />
				</div>

				<vTable
					ref="vTable"
					v-bind="{data, columns, defaults, batch, loading}"
					@select="select"
					@getData="getData"
					@fieldA="fieldA"
				/>

				<vPagination v-if="pagination" v-bind="[pagination, {loading}]" @getData="getData" />
				<vBatch v-if="selected.length > 0 && batch" v-bind="{selected, batch}" @unselect="unselect" @fieldA="fieldA" />
			</box>
		</div>
	</div>
</template>

<script>
import {omit, get} from "lodash";
import {endpointUrl} from "@/modules/utils";
import * as components from "./components";
import vModifiers from "@/components/modifiers.vue";
import box from "../box.vue";

export default {
	components: {...components, vModifiers, box},
	props: {
		tableId: {type: String, required: true},
		title: {type: String, required: false}
	},
	data() {
		return {
			definitions: null,
			pagination: null,
			data: null,
			selected: [],

			loading: false
		}
	},
	computed: {
		query: (t) => t.$route.query,
		columns: (t) => t.definitions.columns, // required
		defaults: (t) => t.definitions.defaults, // required
		endpoint: (t) => t.definitions.endpoint, // required
		actions: (t) => t.definitions.actions,
		batch: (t) => t.definitions.batch,
		modifiers: (t) => t.definitions.modifiers,
		filters: (t) => t.definitions.filters,
		search: (t) => t.definitions.search,
		includes: (t) => t.definitions.includes
	},
	methods: {
		select(items) {
			this.selected = items;
		},

		unselect() {
			this.$refs.vTable.unselect();
		},

		async fieldA({action, data, item, done}) {
			const actions = {
				refresh: async ({done}) => {
					await this.getData();
				},

				update: async ({item, data, done}) => { // fieldA action
					const modifiers = this.modifiers ? this.modifiers.map(x => omit(x, "options")) : undefined;

					const url = endpointUrl({data: item, url: `${this.endpoint.url}/{id}`});
					await this.$http.put(url, {...data, modifiers});
				}
			};

			try {
				await actions[action]({data, item, done});
			} catch (err) {
				console.log(err);
			} finally {
				if (done) await done();
			}
		},

		async filter({done}) {
			await this.getData({loading: false}); // don't show table loading indicator
			await done();
		},

		async refreshAll({done}) {
			this.unselect();
			await this.getDefinitions();
			await this.getData();
			if (done) await done();
		},

		async getDefinitions() {
			const params = {
				modifiers: this.query.modifiers
			};

			const {data} = await this.$http.get(`definitions/table/${this.tableId}`, {params});
			this.definitions = data;
		},

		async getData({loading} = {loading: true}) {
			this.loading = loading;

			const sort = this.query.sort || this.defaults.sort;
			const _this = this;

			const params = {
				get sort() {
					const order = sort.order === "descending" ? "-" : "";
					return `${order}${sort.prop}`;
				},
				get modifiers() {
					if (_this.query.modifiers) {
						return _this.query.modifiers;
					}

					if (_this.modifiers) {
						return _this.modifiers.reduce((obj, item) => {
							return {...obj, [item.key]: item.value};
						}, {});
					}
				},
				page: this.query.page,
				count: this.query.pagesize,
				filter: this.query.filters,
				include: this.includes ? this.includes.join(",") : undefined
			};

			const {data: {data, meta}} = await this.$http.get(this.endpoint.url, {params});
			this.data = data;
			this.pagination = meta;

			this.loading = false;
		}
	},
	created() {
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
	.content {
		.top {
			padding: 1.5em 1.5em;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.info {
				width: 100%;
				display: flex;
				align-items: center;

				.total {
					font-size: em(12);
					margin-left: 0.75em;
					color: $blue3;
				}

				.loading {
					margin-left: auto;
					font-size: em(16);
					color: $blue5;

					&-enter-active, &-leave-active {
						transition: cubic(opacity, 0.1s);
					}
					&-enter, &-leave-to {
						opacity: 0;
					}
				}
			}
		}
	}

}
</style>
