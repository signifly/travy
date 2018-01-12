<template>
	<div class="table-main" v-if="definitions">

		<div class="header">
			<filters />
			<actions v-bind="{actions}" />
		</div>

		<div class="table">
			<box>
				<div class="top">
					<div class="info">
						<div class="title">{{title}}</div>
						<div class="total">{{pagination.total}}</div>
					</div>
					<modifiers v-bind="{modifiers}" />
				</div>

				<Table
				:default-sort="SortFinal"
				ref="table"
				v-bind="{data}"
				header-row-class-name="header-row"
				header-cell-class-name="header-cell"
				@sort-change="sort"
				@selection-change="select">

					<TableColumn type="selection" v-if="batch.active" />

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

				<pagination v-bind="{data: pagination}" @page="page" />
				<panel v-if="selected.length > 0" v-bind="{selected, batch}" @unselect="unselect" />
			</box>
		</div>
	</div>
</template>

<script>
import {mapValues} from "lodash";
import box from "../box.vue";
import {pagination, panel, actions, filters, modifiers} from "./index";
import {Table, TableColumn} from "element-ui";
import {vText, vTextBold, vStatus, vImage, vSwitch, vSelect} from "./fields";

export default {
	components: {box, pagination, panel, actions, filters, modifiers, Table, TableColumn, vText, vTextBold, vStatus, vImage, vSwitch, vSelect},
	props: {
		title: {type: String, required: false}
	},
	data() {
		return {
			definitions: null,
			data: null,
			pagination: {},
			selected: []
		}
	},
	computed: {
		components: (t) => t.$options.components,
		query: (t) => t.$route.query,
		batch: (t) => t.definitions.batch,
		modifiers: (t) => t.definitions.modifiers,
		actions: (t) => t.definitions.actions,
		defaults: (t) => t.definitions.defaults,
		sortDefault: (t) => t.defaults.sort,
		sortQuery: (t) => t.query.sortBy && t.query.sortBy ? {prop: t.query.sortBy, order: t.query.sortDir} : null,
		SortFinal: (t) => t.sortQuery || t.sortDefault,

		tableColumns() {
			return this.definitions.columns.map(x => ({...x,
				sortable: x.sortable ? "custom" : false,
				prop: x.sortBy
			}));
		}
	},
	methods: {
		props(props, item) {
			return mapValues(props, (key) => item[key]);
		},

		sort({prop, order}) {
			const sort = {sortBy: prop || undefined, sortDir: order || undefined};
			if (this.data) this.$router.push({query: sort}); // don't set query params for default sorting
			this.getData();
		},

		page(page) {
			page = page === 1 ? undefined : page;
			this.$router.push({query: {...this.query, page}});
			this.getData();
		},

		select(items) {
			this.selected = items;
		},

		unselect() {
			this.$refs.table.clearSelection();
		},

		getDefinitions() {
			this.definitions = {
				defaults: {
					sort: {
						prop: "text",
						order: "ascending"
					}
				},
				batch: {
					active: true,
					actions: [
						{
							icon: "plus",
							title: "Add",
							status: "success",
							type: "create"
						},
						{
							icon: "edit",
							title: "Edit",
							status: "primary",
							type: "update"
						}
					]
				},
				actions: [
					{
						icon: "plus",
						title: "Nyt produkt",
						status: "primary",
						type: "create"
					},
					{
						icon: "",
						title: "Nuke 🚀",
						status: "danger",
						type: "nuke"
					}
				],
				modifiers: [
					{
						title: "Language",
						value: "dk",
						options: [
							{
								label: "Danmark", // required
								value: "dk", // required
								icon: "flags/dk",
								disabled: false
							},
							{
								label: "England",
								value: "uk",
								icon: "flags/gb"
							},
							{
								label: "Murica",
								value: "US",
								icon: "flags/us",
								disabled: true
							}
						]
					},
					{
						title: "Language",
						value: "dk",
						options: [
							{
								label: "Danmark", // required
								value: "dk", // required
								disabled: false
							},
							{
								label: "England",
								value: "UK",
							},
							{
								label: "Murica",
								value: "US",
								disabled: true
							}
						]
					}
				],
				columns: [
					{
						name: "title",
						label: "Title",
						sortable: true,
						sortBy: "text",
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
						sortBy: "priceDiff",
						fieldType: {
							id: "vText"
						},
						props: {
							text: "priceDiff",
							status: "priceDiffStatus"
						}
					}
				]
			};

			// setTimeout(() => this.loaded = true, 500);
		},

		getData() {
			const sort = this.SortFinal;

			const params = {
				page: this.query.page,
				sort: `${sort.prop}:${sort.order}`
			};

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
			];

			const meta = {
				current_page: 1,
				from: 1,
				last_page: 2,
				path: "http://api.sikane.dk/v1/products",
				per_page: 15,
				to: 17,
				total: 17
			};

			this.pagination = meta;
		}
	},
	created() {
		this.getDefinitions();
	}
};
</script>

<style lang="scss" scoped>
.table-main {
	.header {
		margin-bottom: 1.5em;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.table {
		.top {
			padding: 1.5em 1.5em;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.info {
				display: flex;
				align-items: center;

				.total {
					font-size: em(12);
					margin-left: 0.75em;
					color: $blue3;
				}
			}
		}

		/deep/ {
			.el-table {
				overflow: visible;

				&__body-wrapper {
					overflow: visible;
				}

				td, th {
					padding: 3px 0;
				}

				.header {
					&-row {
						background-color: $white2;
					}
					&-cell {
						background-color: transparent;
						color: $blue4;
					}
				}

				.cell {
					overflow: visible;
				}
			}
		}
	}

}
</style>
