<template>
	<div class="table-main" v-if="definitions">

		<div class="header">
			<vFilters v-bind="{filters, search, getData}" />
			<vActions v-bind="{actions}" />
		</div>

		<div class="content">
			<box>
				<div class="top">
					<div class="info">
						<div class="title">{{title}}</div>
						<div class="total" v-if="pagination">{{pagination.total}}</div>
					</div>
					<vModifiers v-bind="{modifiers}" @getData="getData" />
				</div>

				<vTable v-bind="{data, columns, defaults, selected, batch, modifiers, endpoints}" @getData="getData" @select="selected = $event" ref="vTable" />

				<vPagination v-if="pagination" v-bind="pagination" @getData="getData" />
				<vPanel v-if="selected.length > 0" v-bind="{selected, batch}" @unselect="unselect" />
			</box>
		</div>
	</div>
</template>

<script>
import {mapValues, mapKeys, omit, pickBy, get} from "lodash";
import * as components from "./components";
import box from "../box.vue";

export default {
	components: {...components, box},
	props: {
		id: {type: String, required: true},
		title: {type: String, required: false}
	},
	data() {
		return {
			definitions: null,
			data: null,
			pagination: null,
			selected: [],
		}
	},
	computed: {
		query: (t) => t.$route.query,
		columns: (t) => t.definitions.columns,
		batch: (t) => t.definitions.batch,
		modifiers: (t) => t.definitions.modifiers,
		actions: (t) => t.definitions.actions,
		defaults: (t) => t.definitions.defaults,
		endpoints: (t) => t.definitions.endpoints,
		filters: (t) => t.definitions.filters,
		search: (t) => t.definitions.search,
		includes: (t) => t.definitions.includes,
		sorting: (t) => t.query.sort || t.defaults.sort,
	},
	methods: {
		unselect() {
			this.$refs.vTable.unselect();
		},

		async getDefinitions() {
			if (this.id !== "products") {
				const {data} = await this.$http.get(`definitions/table/${this.id}`, {params: this.query.modifiers});
				this.definitions = data;
				return;
			};

			this.definitions = {
				endpoints: {
					index: {
						method: "GET",
						url: "products",
						id: "id"
					},
					store: {
						method: "POST",
						url: "products",
						id: "id"
					},
					show: {
						method: "GET",
						url: "products/{id}",
						id: "id"
					},
					update: {
						method: "PUT",
						url: "products/{id}",
						id: "id"
					},
					destroy: {
						method: "DELETE",
						url: "products/{id}",
						id: "id"
					},
					bulkUpdate: {
						method: "PUT",
						url: "products",
						id: "id"
					}
				},
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

				includes: [],

				search: {
					placeholder: "search"
				},

				filters: [
					{
						id: "switch2",
						title: "show Prices",
						fieldType: {
							id: "vSwitch",
							props: {
								value: "prices"
							}
						},
						data: {
							prices: false
						}
					},
					{
						id: "checkbox1",
						title: "show Dates",
						fieldType: {
							id: "vCheckbox",
							props: {
								value: "dates"
							}
						},
						data: {
							dates: false
						}
					}
				],

				actions: [
					{
						icon: "plus",
						title: "Nyt produkt",
						status: "primary",
						type: "create"
					},
					{
						icon: "",
						title: "Ny sofa/lampe 🛋️",
						status: "success",
						type: "nuke"
					}
				],

				modifiers: [
					{
						title: "Language",
						value: "dk",
						key: "lang",
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
								value: "us",
								icon: "flags/us",
								disabled: true
							}
						]
					},
					{
						title: "Language",
						value: "dk",
						key: "øv",
						options: [
							{
								label: "Danmark", // required
								value: "dk", // required
								disabled: false
							},
							{
								label: "England",
								value: "uk",
							},
							{
								label: "Murica",
								value: "us",
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
							id: "vText",
							action: "products/{id}",
							props: {
								text: "text",
								status: "textStatus"
							}
						}
					},
					{
						name: "image",
						label: "Image",
						fieldType: {
							id: "vImage",
							props: {
								image: "image"
							}
						}
					},
					{
						name: "switch",
						label: "Switch",
						fieldType: {
							id: "vSwitch",
							props: {
								value: "switchProp"
							}
						}
					},
					{
						name: "status",
						label: "Status",
						fieldType: {
							id: "vStatus",
							props: {
								text: "status",
								status: "statusAv"
							}
						}
					},
					{
						name: "select",
						label: "Select",
						fieldType: {
							id: "vSelect",
							props: {
								options: "selectOptions",
								value: "selectValue"
							}
						}
					},
					{
						name: "prisforskel",
						label: "Prisforskel",
						sortable: true,
						sortBy: "priceDiff",
						fieldType: {
							id: "vText",
							props: {
								text: "priceDiff",
								status: "priceDiffStatus"
							}
						}
					},
					{
						name: "actions",
						label: "Actions",
						sortable: false,
						fieldType: {
							id: "vActions",
							props: {
								items: "actionItems"
							}
						}
					}
				]
			};
		},

		async getData({type} = {}) {
			if (type === "modifiers") await this.getDefinitions();

			const sort = this.sorting;

			const params = {
				get sort() {
					const order = sort.order === "descending" ? "-" : "";
					return `${order}${sort.prop}`;
				},
				include: this.includes.join(","),
				page: this.query.page,
				...this.query.modifiers,
				...this.query.filter
			};

			if (this.id !== "products") {
				const {data} = await this.$http.get(this.endpoints.index.url, {params});
				this.data = data.data;
				this.pagination = data.meta;

				return;
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
					priceDiffStatus: "success",
					actionItems: [
						{
							title: "Delete",
							type: "delete",
							description: "Do you wanna delete this product?"
						}
					]
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
					priceDiffStatus: "danger",
					actionItems: [
						{
							title: "Delete",
							type: "delete",
							description: "Do you wanna delete this product?"
						},
						{
							title: "View",
							type: "show"
						}
					]
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
	.content {
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
	}

}
</style>
