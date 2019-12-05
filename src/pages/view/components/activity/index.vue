<template>
	<div class="activity">
		<div class="title">Change history</div>

		<div class="table">
			<Table size="small" class="activity-table" v-bind="{data: itemsMap}">
				<TableColumn type="expand" v-slot="{row}">
					<expand v-bind="row.properties" />
				</TableColumn>
				<TableColumn width="100" label="id" prop="hashId" />
				<TableColumn width="180" label="date" prop="date" />
				<TableColumn width="150" label="type" prop="type" />
				<TableColumn width="150" label="subject" prop="subject" />
				<TableColumn
					width="250"
					label="user"
					prop="user"
					v-if="indexId !== 'users'"
				/>
				<TableColumn label="changes" prop="changes" />
				<TableColumn label="actions" prop="revert" v-slot="{row}">
					<div class="revert">
						<Button
							v-if="row.revertable"
							size="mini"
							type="info"
							:plain="true"
							icon="el-icon-refresh"
							@click="revert(row)"
						>
							REVERT
						</Button>
					</div>
				</TableColumn>
			</Table>
		</div>

		<pagination v-if="meta" v-bind="meta" @update="getItems" />
	</div>
</template>

<script>
import {Table, TableColumn, Button} from "element-ui";
import pagination from "./pagination";
import {date} from "@/modules/utils";
import expand from "./expand";
import {get} from "lodash";

export default {
	components: {Table, TableColumn, Button, expand, pagination},
	props: {
		data: {type: Object, required: true},
		url: {type: String, required: true}
	},
	data() {
		return {
			items: [],
			meta: null,
			pageCount: 15
		};
	},
	computed: {
		indexId: (t) => t.$route.params.indexId,

		itemsMap: (t) =>
			t.items.map((x) => ({
				id: x.id,
				hashId: `#${x.id}`,
				type: x.description,
				properties: x.properties,
				revertable: x.revertable,
				subject: x.humanized_subject,
				date: date(x.updated_at).sDateTime,
				user: x.causer ? x.causer.name : "System",
				changes: Object.keys(get(x.properties, "attributes", {})).length
			}))
	},
	methods: {
		async getItems(page = 1) {
			const {
				data: {data, meta}
			} = await this.$axios.get(`${this.url}/activity`, {
				params: {page, count: this.pageCount}
			});
			this.meta = meta;
			this.items = data;
		},

		async revert({id}) {
			await this.$axios.post(`${this.url}/activity/${id}/revert`);
			this.$emit("event", {actions: {refresh: true}});
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
		.activity-table {
			background-color: transparent;

			::v-deep {
				thead {
					color: $blue4;
				}

				tr,
				th {
					background-color: transparent;
				}

				.el-table__expanded-cell {
					background-color: transparent;
				}
			}

			.revert {
				zoom: 0.8;

				.el-button {
					font-weight: 600;
				}
			}
		}
	}
}
</style>
