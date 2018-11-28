<template>
	<div class="activity">
		<div class="title">Change history</div>

		<div class="table">
			<Table size="small" v-bind="{data: itemsMap}">
				<TableColumn width="100" label="id" prop="id"/>
				<TableColumn width="180" label="date" prop="date"/>
				<TableColumn width="150" label="type" prop="type"/>
				<TableColumn width="150" label="subject" prop="subject" />
				<TableColumn width="250" label="user" prop="user" v-if="tableId !== 'users'"/>
				<TableColumn label="changes" prop="changes"/>
			</Table>
		</div>

		<pagination v-bind="meta" v-if="meta" @update="getItems"/>
	</div>
</template>

<script>
import {date, rStringProps} from "@/modules/utils";
import {Table, TableColumn} from "element-ui";
import pagination from "./pagination";
import {get} from "lodash";

export default {
	components: {Table, TableColumn, pagination},
	props: {
		endpoint: {type: Object, required: true},
		data: {type: Object, required: true}
	},
	data() {
		return {
			items: [],
			meta: null,
			pageCount: 10
		}
	},
	computed: {
		tableId: (t) => t.$route.params.tableId,
		endpointUrl: (t) => rStringProps({data: t.data, val: t.endpoint.url}),

		itemsMap: (t) => t.items.map(x => ({
			id: `#${x.id}`,
			type: x.description,
			subject: x.humanized_subject,
			date: date(x.updated_at).sDateTime,
			user: x.causer ? x.causer.name : "System",
			changes: Object.keys(get(x.properties, "attributes", {})).join(", ")
		}))
	},
	methods: {
		async getItems(page = 1) {
			const {data: {data, meta}} = await this.$axios.get(`${this.endpointUrl}/activity`, {
				params: {count: this.pageCount, page}
			});
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
}
</style>
