<template>
	<div class="table-main">
		<box>
			<div class="header">
				<div class="info">
					<div class="title">{{title}}</div>
				</div>
			</div>
			<Table
			v-bind="{data}"
			@sort-change="sort"
			header-row-class-name="header-row"
			header-cell-class-name="header-cell">
				<TableColumn v-for="column in tableColumns" v-bind="column" :key="column.name">
					<component
						slot-scope="scope"
						v-if="components[column.fieldType.id]"
						:is="column.fieldType.id"
						:column="column"
						v-bind="props(column.props, scope.row)"
					/>
				</TableColumn>
			</Table>
		</box>
	</div>
</template>

<script>
import {mapValues} from "lodash";
import box from "../box.vue";
import {Table, TableColumn} from "element-ui";
import {vText, vTextBold, vStatus, vImage, vSwitch, vSelect} from "./fields";

export default {
	components: {box, Table, TableColumn, vText, vTextBold, vStatus, vImage, vSwitch, vSelect},
	props: {
		title: {type: String, required: false}
	},
	data() {
		return {
			columns: [],
			data: null
		}
	},
	computed: {
		components: (t) => t.$options.components,

		tableColumns() {
			return this.columns.map(x => ({
				...x,
				sortable: x.sortable ? "custom" : false
			}));
		}
	},
	methods: {
		props(props, item) {
			return mapValues(props, (key) => item[key]);
		},

		sort({prop, order}) {
			console.log(prop, order);
		},

		getData() {
			this.columns = [
				{
					name: "title",
					label: "Title",
					sortable: true,
					fieldType: {
						id: "vText"
					},
					props: {
						text: "text",
						status: "textStatus"
					}
				},
				{
					name: "image",
					label: "Image",
					sortable: false,
					fieldType: {
						id: "vImage"
					},
					props: {
						image: "image"
					}
				},
				{
					name: "switch",
					label: "Switch",
					sortable: false,
					fieldType: {
						id: "vSwitch"
					},
					props: {
						value: "switchProp"
					}
				},
				{
					name: "status",
					label: "Status",
					sortable: false,
					fieldType: {
						id: "vStatus"
					},
					props: {
						text: "status",
						status: "statusAv"
					}
				},
				{
					name: "select",
					label: "Select",
					sortable: false,
					fieldType: {
						id: "vSelect"
					},
					props: {
						options: "selectOptions",
						value: "selectValue"
					}
				},
				{
					name: "prisforskel",
					label: "Prisforskel",
					sortable: true,
					fieldType: {
						id: "vText"
					},
					props: {
						text: "priceDiff",
						status: "priceDiffStatus"
					}
				},
			];

			this.data = [
				{
					id: 1,
					text: "Nest sofa",
					description: "A comfortable sofa in which to build a nest.",
					status: "13/14",
					statusAv: "warning",
					image: "http://element.eleme.io/static/component.bd3411b.png",
					switchProp: false,
					selectValue: "a",
					selectOptions: [
						{
							label: "A",
							value: "a",
							disabled: false
						},
						{
							label: "B",
							value: "b",
							disabled: false
						},
						{
							label: "C",
							value: "c",
							disabled: true
						}
					],
					priceDiff: "+5,2%",
					priceDiffStatus: "success"
				},
				{
					id: 2,
					text: "Nest ergesrggsofa",
					description: "A comfortable sofa in which to build a nest.",
					status: "13/14",
					statusAv: "warning",
					image: undefined,
					switchProp: true,
					selectOptions: [
						{
							label: "A",
							value: "a",
							disabled: false
						},
						{
							label: "B",
							value: "b",
							disabled: false
						},
						{
							label: "C",
							value: "c",
							disabled: true
						}
					],
					priceDiff: "-1,3%",
					priceDiffStatus: "danger"
				}
			]
		}
	},
	created() {
		this.getData();
	}
};
</script>

<style lang="scss" scoped>
.table-main {
	.header {
		padding: 1.5em 1.5em;
	}
}
</style>

<style lang="scss">
.table-main {
	.el-table {
		overflow: visible;

		&__body-wrapper {
			overflow: visible;
		}

		.header {
			&-row {
				background-color: $white2;
			}
			&-cell {
				background-color: transparent;
			}
		}

		.cell {
			overflow: visible;
		}
	}
}
</style>
