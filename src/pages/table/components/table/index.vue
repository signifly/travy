<template>
	<div class="table" :class="{loading}">
		<Table
			stripe
			ref="table"
			row-key="id"
			:default-sort="sorting"
			v-bind="{data, emptyText}"
			header-row-class-name="header-row"
			header-cell-class-name="header-cell"
			@sort-change="sort"
			@selection-change="select"
		>
			<tableColumn type="expand" v-if="subtable">
				<subtable
					slot-scope="{row}"
					v-bind="[subtable, {data: row}]"
					@event="$emit('event', $event)"
				/>
			</tableColumn>

			<TableColumn
				type="selection"
				:reserve-selection="true"
				v-if="batchActive"
			/>

			<!-- If we don't key sublabel, it won't update on changes -->
			<TableColumn
				v-for="column in tableColumns"
				v-bind="column"
				:key="column.name + column.sublabel"
			>
				<span class="column-header" slot="header">
					<span class="label" v-text="column.label" />
					<span
						class="sublabel"
						v-if="column.sublabel"
						v-text="column.sublabel"
					/>
				</span>

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
import {Table, TableColumn} from "element-ui";
import subtable from "./subtable";
import state from "../../state";
import field from "../field";
import {get} from "lodash";

export default {
	components: {Table, TableColumn, subtable, field},
	props: {
		data: {type: Array, required: false},
		columns: {type: Array, required: true},
		metadata: {type: Object, required: false},
		subtable: {type: Object, required: false},
		loading: {type: Boolean, required: false},
		batch: {type: Object, default: () => ({})},
		defaults: {type: Object, default: () => ({})}
	},
	computed: {
		query: () => state.query,
		emptyText: (t) => (t.data ? "No data" : "Loading"),
		sorting: (t) => t.query.sort || t.defaults.sort || {},
		batchActive: (t) => t.batch.bulk || t.batch.sequential,

		tableColumns() {
			return this.columns.map((x) => ({
				...x,
				prop: x.sortBy,
				sortable: x.sortable ? "custom" : false,
				sublabel: get(this.metadata, x.sublabel)
			}));
		}
	},
	methods: {
		sort({prop, order}) {
			const sort = prop && order ? {prop, order} : undefined;

			// don't set query params for default sorting
			if (this.data)
				state.setQuery({
					type: "replace",
					query: {
						...this.query,
						page: undefined,
						sort
					}
				});

			this.$emit("getData");
		},

		select(items) {
			this.$emit("select", items);
		},

		unselect() {
			this.$refs.table.clearSelection();
		}
	},
	created() {
		// element ui will call sort-change on init if any sorting is defined
		if (Object.keys(this.sorting).length === 0) {
			this.$emit("getData");
		}
	}
};
</script>

<style lang="scss" scoped>
.table {
	::v-deep {
		.el-table {
			overflow: visible;

			&__body-wrapper {
				overflow: visible;
			}

			th {
				padding: 0;
				height: 3.25em;
			}

			// disable row hover
			tr {
				td {
					background-color: #fff !important;
				}

				&.el-table__row--striped {
					td {
						background-color: #fafafa !important;
					}
				}
			}

			td {
				padding: em(13) 0;
			}

			.header {
				&-row {
					background-color: $white2;
					transition: cubic(opacity, 0.1s);

					@at-root .table.loading ::v-deep .el-table .header-row {
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
				display: flex;
				align-items: center;

				.column-header {
					margin-right: 0.2em;
					margin-top: -2px;

					.label {
						display: block;
					}

					.sublabel {
						display: block;
						font-size: 13px;
						font-weight: 400;
						margin-top: -0.4em;
					}
				}
			}
		}
	}
}
</style>
