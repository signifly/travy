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
	</div>
</template>

<script>
import {get} from "lodash";
import {endpoint, date} from "@/modules/utils";
import {Table, TableColumn} from "element-ui";

export default {
	components: {Table, TableColumn},
	props: {
		endpoints: {type: Object, required: true},
		data: {type: Object, required: true}
	},
	data() {
		return {
			items: []
		}
	},
	computed: {
		itemsMap: (t) => t.items.map(x => ({
			id: x.id,
			type: x.description,
			date: date(x.updated_at).sDateTime,
			user: get(x, "causer.full_name", "System"),
			changes: Object.keys(x.properties.attributes).join(", ")
		}))
	},
	methods: {
		async getItems() {
			const url = endpoint({type: "activity", item: this.data, endpoints: this.endpoints});
			const {data} = await this.$http.get(url);
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
}
</style>
