<template>
	<div class="subtable">
		<Table
			row-key="id"
			:data="dataC"
			header-row-class-name="header-row"
			header-cell-class-name="header-cell"
		>
			<TableColumn v-for="column in columns" v-bind="column" :key="column.name">
				<field
					slot-scope="scope"
					v-bind="{scope, column}"
					@event="$emit('event', $event)"
				/>
			</TableColumn>
		</Table>
	</div>
</template>

<script>
import {rStringProps} from "@/modules/utils";
import {Table, TableColumn} from "element-ui";
import field from "../field";

export default {
	components: {Table, TableColumn, field},
	props: {
		endpoint: {type: Object, required: false},
		columns: {type: Array, required: true},
		item: {type: Object, required: true},
		data: {type: Array, required: true}
	},
	data() {
		return {
			resData: null
		};
	},
	computed: {
		endpointC: (t) => rStringProps({data: t.item, val: t.endpoint}),
		dataC: (t) => (t.endpoint ? t.resData : t.data)
	},
	methods: {
		async getData() {
			const {
				data: {data}
			} = await this.$axios.get(this.endpointC.url, {
				params: this.endpointC.params
			});
			this.resData = data;
		}
	},
	created() {
		if (this.endpoint) {
			this.getData();
		}
	}
};
</script>

<style lang="scss" scoped>
$header: darken($white2, 4%);

.subtable {
	zoom: 0.85;
	padding-left: 4.4em;
	transform: translateZ(0);
	background-color: $white2;
	margin-bottom: -1px;
	margin-right: -1px;
	overflow: hidden;

	::v-deep {
		.el-table {
			body & {
				border-left: $header solid 1px;

				tr {
					background-color: $white2;
				}

				.header {
					&-row {
						background-color: $header;
					}
				}
			}
		}
	}
}
</style>
