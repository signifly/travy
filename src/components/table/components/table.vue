<template>
	<div class="table" :class="{loading}">
		<Table
		ref="table"
		row-key="id"
		v-bind="{data}"
		:default-sort="sorting"
		header-row-class-name="header-row"
		header-cell-class-name="header-cell"
		:empty-text="emptyText"
		@sort-change="sort"
		@selection-change="select">

			<TableColumn type="selection" :reserve-selection="true" v-if="batchActive"/>

			<TableColumn v-for="column in tableColumns" v-bind="column" :key="column.name">
				<vField slot-scope="scope" v-bind="{scope, column}" @fieldA="$emit('fieldA', $event)" :key="updateC"/>
			</TableColumn>
		</Table>
	</div>
</template>

<script>
import {Table, TableColumn} from "element-ui";
import {vField} from "./index.js";

export default {
	components: {Table, TableColumn, vField},
	props: {
		loading: {type: Boolean, required: false},
		data: {type: Array, required: false},
		columns: {type: Array, required: true},
		defaults: {type: Object, required: true},
		updateC: {type: Number, required: true},
		batch: {type: Object, default: () => ({})}
	},
	computed: {
		query: (t) => t.$route.query,
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
			if (this.data) this.$router.replace({query: {...this.query, page: undefined, sort}}); // don't set query params for default sorting
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

			.cell {
				overflow: visible;
			}
		}
	}
}
</style>
