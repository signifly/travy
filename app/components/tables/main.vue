<template>
	<div class="table-main" v-if="definitions">

		<div class="header">
			<vFilters v-bind="{filters, search, getData}" />
			<vActions v-bind="{actions, endpoints}" />
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
					v-bind="{data, columns, defaults, batch}"
					@select="selected = $event"
					@getData="getData"
					@fieldA="fieldA"
				/>

				<vPagination v-if="pagination" v-bind="pagination" @getData="getData" />
				<vBatch v-if="selected.length > 0" v-bind="{endpoints, selected, batch}" @unselect="unselect" />
			</box>
		</div>
	</div>
</template>

<script>
import {mapValues, mapKeys, omit, pickBy, get} from "lodash";
import * as components from "./components";
import box from "../box.vue";

export default {
	components: {...components, box},
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
		includes: (t) => t.definitions.includes,
		sorting: (t) => t.query.sort || t.defaults.sort
	},
	methods: {
		unselect() {
			this.$refs.vTable.unselect();
		},

		fieldA({action, data, item, done}) {
			this[action]({data, item, done});
		},

		endpoint({type, item}) {
			const endpoint = this.endpoints[type];

			if (endpoint.url.includes("{id}")) {
				const id = item[endpoint.id];
				if (!id) throw new Error(`missing ${endpoint.id} on item ${this.item.id}`);

				return endpoint.url.replace("{id}", id);
			} else {
				return endpoint.url;
			}
		},

		show({item}) {
			const url = this.endpoint({type: "show", item});
			this.$router.push(`/${url}`);
		},

		async update({item, data, done}) {
			try {
				const modifiers = this.modifiers.map(x => omit(x, "options"));
				const url = this.endpoint({type: "update", item});
				await this.$http.put(url, {data, modifiers});
			} catch (err) {
				console.log(err);
			} finally {
				if (done) done();
			}
		},

		async remove({item, done}) {
			try {
				const url = this.endpoint({type: "destroy", item});
				await this.$http.delete(url);
				await this.getData();
			} catch (err) {
				console.log(err);
			} finally {
				if (done) done();
			}
		},

		async getDefinitions() {
			if (this.id !== "test") {
				const {data} = await this.$http.get(`definitions/table/${this.id}`, {params: this.query.modifiers});
				this.definitions = data;
			} else {
				const {data} = await this.$http.get("https://sikaline.glitch.me/table-defs/products");
				this.definitions = data;
			}
		},

		async getData({type} = {}) {
			if (type === "modifiers") await this.getDefinitions();

			const sort = this.sorting;

			const params = {
				get sort() {
					const order = sort.order === "descending" ? "-" : "";
					return `${order}${sort.prop}`;
				},
				page: this.query.page,
				filter: omit(this.query.filters, ["q"]),
				q: get(this.query.filters, "q"),
				modifier: this.query.modifiers,
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
