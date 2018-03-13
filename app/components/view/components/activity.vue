<template>
	<div class="activity">
		<div class="title">Change history</div>

		<div class="table">
			<Table size="small" v-bind="{data: itemsMap}">
				<TableColumn width="100" label="id" prop="id" />
				<TableColumn width="180" label="date" prop="date" />
				<TableColumn width="250" label="user" prop="user" />
				<TableColumn width="150" label="type" prop="type" />
				<TableColumn label="changes" prop="changes" />
			</Table>
		</div>

		<div class="pagination" v-if="paginationActive">
			<Pagination
				small
				background
				layout="prev, pager, next"
				:total="pagination.total"
				:page-size="pagination.per_page"
				:current-page.sync="page"
				@current-change="getItems"
			/>
		</div>
	</div>
</template>

<script>
import {endpointUrl, date} from "@/modules/utils";
import {Table, TableColumn, Pagination} from "element-ui";

export default {
	components: {Table, TableColumn, Pagination},
	props: {
		endpoints: {type: Object, required: true},
		data: {type: Object, required: true}
	},
	data() {
		return {
			items: [],
			page: 1,
			pageCount: 8,
			pagination: null
		}
	},
	computed: {
		endpointUrl: (t) => endpointUrl({data: t.data, url: t.endpoints.activity.url}),
		paginationActive: (t) => t.pagination && t.pagination.last_page > 1,

		itemsMap: (t) => t.items.map(x => ({
			id: `#${x.id}`,
			type: x.description,
			date: date(x.updated_at).sDateTime,
			user: x.causer ? x.causer.full_name : "System",
			changes: Object.keys(x.properties.attributes).join(", ")
		}))
	},
	methods: {
		async getItems() {
			const {data} = await this.$http.get(this.endpointUrl, {params: {count: this.pageCount, page: this.page}});
			this.pagination = data.meta;
			this.items = data.data;
		}
	},
	created() {
		this.getItems();
	}
};
</script>

<style lang="scss" scoped>
.activity {
	margin: 4em 0;

	.title {
		font-size: em(14);
		font-weight: 600;
		color: $blue4;
		margin-bottom: 1em;
	}

	.table {
		.el-table {
			background-color: transparent;

			/deep/ {
				thead {
					color: $blue4;
				}
				tr, th {
					background-color: transparent;
				}

				.el-table__expanded-cell {
					background-color: transparent;
				}
			}
		}
	}

	.pagination {
		margin-top: 1em;
		display: flex;
		justify-content: center;
	}
}
</style>
