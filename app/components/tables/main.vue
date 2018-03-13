<template>
	<div class="table-main" v-if="definitions">

		<div class="header">
			<vFilters v-bind="[filters, {search, getData}]" />
			<vActions v-bind="{actions, endpoints}" @submit="getData" />
		</div>

		<div class="content">
			<box>
				<div class="top">
					<div class="info">
						<div class="title">{{title}}</div>
						<div class="total" v-if="pagination">{{pagination.total}}</div>
					</div>
					<vModifiers v-bind="{modifiers}" @getData="getData" />
				</div>

				<vTable
					ref="vTable"
					v-bind="{data, columns, defaults, batch, endpoints}"
					@select="selected = $event"
					@getData="getData"
					@fieldA="fieldA"
				/>

				<vPagination v-if="pagination" v-bind="pagination" @getData="getData" />
				<vBatch v-if="selected.length > 0" v-bind="{endpoints, selected, batch}" @unselect="unselect" @submit="getData" />
			</box>
		</div>
	</div>
</template>

<script>
import {omit, get} from "lodash";
import {endpoint} from "@/modules/utils";
import * as components from "./components";
import vModifiers from "@/components/modifiers.vue";
import box from "../box.vue";

export default {
	components: {...components, vModifiers, box},
	props: {
		id: {type: String, required: true},
		title: {type: String, required: false}
	},
	data() {
		return {
			definitions: null,
			data: null,
			pagination: null,
			selected: [],
		}
	},
	computed: {
		query: (t) => t.$route.query,
		columns: (t) => t.definitions.columns,
		batch: (t) => t.definitions.batch,
		modifiers: (t) => t.definitions.modifiers,
		actions: (t) => t.definitions.actions,
		defaults: (t) => t.definitions.defaults,
		endpoints: (t) => t.definitions.endpoints,
		filters: (t) => t.definitions.filters,
		search: (t) => t.definitions.search,
		includes: (t) => t.definitions.includes
	},
	methods: {
		unselect() {
			this.$refs.vTable.unselect();
		},

		fieldA({action, data, item, done}) {
			if (this[action]) this[action]({data, item, done});
		},

		endpoint({type, item}) {
			return endpoint({type, item, endpoints: this.endpoints});
		},

		show({item}) {
			const url = this.endpoint({type: "show", item});
			this.$router.push({path: `/${url}`, query: {modifiers: this.query.modifiers}});
		},

		async update({item, data, done}) {
			try {
				const modifiers = this.modifiers.map(x => omit(x, "options"));
				const url = this.endpoint({type: "update", item});
				await this.$http.put(url, {data, modifiers});
			} catch (err) {} finally {
				if (done) done();
			}
		},

		async remove({item, done}) {
			try {
				const url = this.endpoint({type: "destroy", item});
				await this.$http.delete(url);
				await this.getData();
			} catch (err) {} finally {
				if (done) done();
			}
		},

		async getDefinitions() {
			const params = {
				modifiers: this.query.modifiers
			};

			if (this.id !== "test") {
				const {data} = await this.$http.get(`definitions/table/${this.id}`, {params});
				this.definitions = data;
			} else {
				const {data} = await this.$http.get("https://sikaline.glitch.me/table-defs/products");
				this.definitions = data;
			}
		},

		async getData({type} = {}) {
			if (type === "modifiers") await this.getDefinitions();

			const sort = this.query.sort || this.defaults.sort;
			const _this = this;

			const params = {
				get sort() {
					const order = sort.order === "descending" ? "-" : "";
					return `${order}${sort.prop}`;
				},
				get modifiers() {
					if (_this.query.modifiers) return _this.query.modifiers;
					return _this.modifiers.reduce((obj, item) => {
						return {...obj, [item.key]: item.value};
					}, {});
				},
				page: this.query.page,
				filter: omit(this.query.filters, ["q"]),
				q: get(this.query.filters, "q"),
				include: this.includes.join(",")
			};

			if (this.id !== "test") {
				const {data} = await this.$http.get(this.endpoints.index.url, {params});
				this.data = data.data;
				this.pagination = data.meta;
			} else {
				const {data} = await this.$http.get("https://sikaline.glitch.me/table-data/products", {params});
				this.data = data.data;
				this.pagination = data.meta;
			}
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
				display: flex;
				align-items: center;

				.total {
					font-size: em(12);
					margin-left: 0.75em;
					color: $blue3;
				}
			}
		}
	}

}
</style>
