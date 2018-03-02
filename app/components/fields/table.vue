<template>
	<div class="table" v-if="mounted">
		<components
			:is="vTable"
			v-bind="{columns}"
			:data="columnsData"
			:defaults="{}"
			:modifiers="[]"
			:endpoints="{}"
			:selected="[]"
			:batch="{}"
			@fieldA="fieldA"
		/>
	</div>
</template>

<script>
import {mapKeys} from "lodash";

export default {
	meta: {
		res: {
			props: {
				columnsData: "tableData",
				columns: [
					{
						name: "title",
						label: "Title",
						fieldType: {
							id: "vText",
							props: {
								text: "title"
							}
						}
					},
					// {
					// 	name: "access",
					// 	label: "Access",
					// 	fieldType: {
					// 		id: "vDateRange",
					// 		props: {
					// 			dateStart: "dateStart1",
					// 			dateEnd: "dateEnd1"
					// 		}
					// 	}
					// },
					// {
					// 	name: "salad",
					// 	label: "Salad",
					// 	fieldType: {
					// 		id: "vDateRange",
					// 		props: {
					// 			dateStart: "dateStart2",
					// 			dateEnd: "dateEnd2"
					// 		}
					// 	}
					// }
				]
			},
			data: {
				tableData: [
					{
						id: 0,
						title: "sfef",
						statustext: "spflwe",
						status: "warning",
						dateStart1: 1325376000,
						dateEnd1: 1356998400,
						dateStart2: 1356998400,
						dateEnd2: 1356998400
					}
				]
			}
		}
	},
	props: {
		props: {type: Object, required: true},
		_columns: {type: Array, required: true, doc: true},
		columnsData: {type: Array, required: true, doc: true}
	},
	computed: {
		vTable: (t) => require("@/components/tables/components/table.vue").default // stuff happens
	},
	data() {
		return {
			columns: this._columns,
			mounted: false,
			opts: {
				label: false
			}
		}
	},
	methods: {
		fieldA(obj) {
			// find index of the item in columnsData by {id}, and change key for every data property
			const prop = this.props.columnsData;
			const index = this.columnsData.findIndex(x => x.id === obj.item.id);
			const dataKey = `${prop}[${index}]`;
			obj.data = mapKeys(obj.data, (val, key) => `${dataKey}.${key}`);

			this.$emit("fieldA", obj);
		}
	},
	mounted() {
		this.mounted = true;
	}
};
</script>

<style lang="scss" scoped>
.table {
	border: 0.5px solid $blue2;
	border-top: 0;
	border-bottom: 0;
}
</style>
