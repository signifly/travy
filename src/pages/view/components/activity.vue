<template>
	<div class="activity">
		<div class="title">Change history</div>

		<div class="table">
			<Table size="small" v-bind="{data: itemsMap}">
				<TableColumn width="100" label="id" prop="id" />
				<TableColumn width="180" label="date" prop="date" />
				<TableColumn width="150" label="type" prop="type" />
				<TableColumn width="150" label="subject" prop="subject" />
				<TableColumn width="250" label="user" prop="user" v-if="tableId !== 'users'" />
				<TableColumn label="changes" prop="changes" />
			</Table>
		</div>

		<div class="pagination" v-if="paginationActive">
			<Pagination
				small
				background
				layout="prev, pager, next"
				:total="meta.total"
				:page-size="meta.per_page"
				:current-page.sync="page"
				@current-change="getItems"
			/>
		</div>
	</div>
</template>

<script>
import {get} from "lodash";
import {date, endpointUrl} from "@/modules/utils";
import {Table, TableColumn, Pagination} from "element-ui";

export default {
	components: {Table, TableColumn, Pagination},
	props: {
		endpoint: {type: Object, required: true},
		data: {type: Object, required: true}
	},
	data() {
		return {
			items: [],
			page: 1,
			meta: null,
			pageCount: 8
		}
	},
	computed: {
		tableId: (t) => t.$route.params.tableId,
		paginationActive: (t) => t.meta && t.meta.last_page > 1,
		endpointUrl: (t) => endpointUrl({data: t.data, url: t.endpoint.url}),

		itemsMap: (t) => t.items.map(x => ({
			id: `#${x.id}`,
			type: x.description,
			date: date(x.updated_at).sDateTime,
			user: x.causer ? x.causer.name : "System",
			changes: Object.keys(get(x.properties, "attributes", {})).join(", "),
			subject: x.humanized_subject
		}))
	},
	methods: {
		async getItems(page = 1) {
			const {data: {data, meta}} = await this.$axios.get(`${this.endpointUrl}/activity`, {params: {count: this.pageCount, page}});
			this.meta = meta;
			this.items = data;
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
