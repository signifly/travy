<template>
	<div class="table" :class="{loading}">
		<Table
		ref="table"
		row-key="id"
		:default-sort="sorting"
		v-bind="{data, emptyText}"
		header-row-class-name="header-row"
		header-cell-class-name="header-cell"
		@sort-change="sort"
		@selection-change="select">

			<tableColumn type="expand" v-if="subtable">
				<subtable slot-scope="{row}" v-bind="[subtable, {data, item: row}]" @fieldA="$emit('fieldA', $event)"/>
			</tableColumn>

			<TableColumn type="selection" :reserve-selection="true" v-if="batchActive"/>

			<TableColumn v-for="column in tableColumns" v-bind="column" :key="column.name">
				<field slot-scope="scope" v-bind="{scope, column}" @fieldA="$emit('fieldA', $event)"/>
			</TableColumn>
		</Table>
	</div>
</template>

<script>
import {Table, TableColumn} from "element-ui";
import subtable from "./subtable";
import state from "../../state";
import field from "../field";

export default {
	components: {Table, TableColumn, subtable, field},
	props: {
		data: {type: Array, required: false},
		columns: {type: Array, required: true},
		defaults: {type: Object, required: true},
		subtable: {type: Object, required: false},
		loading: {type: Boolean, required: false},
		batch: {type: Object, default: () => ({})}
	},
	computed: {
		query: () => state.query,
		emptyText: (t) => t.data ? "No data" : "Loading",
		sorting: (t) => t.query.sort || t.defaults.sort || {},
		batchActive: (t) => t.batch.bulk || t.batch.sequential,

		tableColumns() {
			return this.columns.map(x => ({...x,
				sortable: x.sortable ? "custom" : false,
				prop: x.sortBy
			}));
		}
	},
	methods: {
		sort({prop, order}) {
			const sort = prop && order ? {prop, order} : undefined;

			// don't set query params for default sorting
			if (this.data) state.setQuery({type: "replace", query: {
				...this.query,
				page: undefined,
				sort
			}});

			this.$emit("getData");
		},

		select(items) {
			this.$emit("select", items);
		},

		unselect() {
			this.$refs.table.clearSelection();
		}
	}
};
</script>

<style lang="scss" scoped>
.table {
	/deep/ {
		.el-table {
			overflow: visible;

			&__body-wrapper {
				overflow: visible;
			}

			th {
				padding: 0;
				height: 3.25em;
			}

			td {
				padding: em(13) 0;
			}

			.header {
				&-row {
					background-color: $white2;
					transition: cubic(opacity, 0.1s);

					@at-root .table.loading /deep/ .el-table .header-row {
						pointer-events: none;
						opacity: 0.7;
					}
				}
				&-cell {
					background-color: transparent;
					border-top: 1px solid #ebeef5;
					color: $blue4;
				}
			}

			.el-table__expanded-cell {
				padding: 0;
			}

			.cell {
				overflow: visible;
			}
		}
	}
}
</style>
