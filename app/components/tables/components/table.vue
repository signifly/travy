<template>
	<div class="table">
		<Table
		:default-sort="sorting"
		ref="table"
		v-bind="{data}"
		header-row-class-name="header-row"
		header-cell-class-name="header-cell"
		@sort-change="sort"
		@selection-change="select">

			<TableColumn type="selection" v-if="batch.active" />
			<TableColumn v-for="column in tableColumns" v-bind="column" :key="column.name">
				<vField slot-scope="scope" v-bind="{scope, column}" @fieldA="$emit('fieldA', $event)"/>
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
		data: {type: Array, required: false},
		columns: {type: Array, required: true},
		defaults: {type: Object, required: true},
		batch: {type: Object, required: true}
	},
	computed: {
		query: (t) => t.$route.query,
		sorting: (t) => t.query.sort || t.defaults.sort || {},

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
			if (this.data) this.$router.replace({query: {sort, filter: this.query.filter}}); // don't set query params for default sorting
			this.$emit("getData");
		},

		select(items) {
			this.$emit("select", items);
		},

		unselect() {
			this.$refs.table.clearSelection();
		},

		sortCheck() {
			const sortProp = this.sorting.prop;
			const sortProps = this.columns.map(x => x.sortBy).filter(x => x);
			if (!sortProps.includes(sortProp)) {
				console.error("default sort prop doesn't exist in any of the columns as sortBy. Can't get data");
			}
		}
	},
	created() {
		this.sortCheck();
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
