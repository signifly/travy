<template>
	<div class="table" v-if="mounted">
		<vTable
			ref="table"
			v-bind="{columns}"
			:data="columnsData"
			:defaults="{}"
			:modifiers="[]"
			:selected="[]"
			:batch="{}"
			@fieldA="fieldA"
		/>
	</div>
</template>

<script>
import {mapKeys, get} from "lodash";
import vTable from "@/pages/table/components/table.vue";

export default {
	components: {vTable},
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
					}
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
		_columns: {type: Array, required: true, doc: true},
		columnsData: {type: Array, required: true, doc: true},
		_columnsData: {type: String, required: true}
	},
	data() {
		return {
			columns: this._columns,
			mounted: false
		}
	},
	methods: {
		fieldA(obj) {
			// find index of the item in columnsData by {id}, and change key for every data property
			const prop = this._columnsData;
			const index = this.columnsData.findIndex(x => x.id === obj.item.id);
			const dataKey = `${prop}[${index}]`;
			obj.data = mapKeys(obj.data, (val, key) => `${dataKey}.${key}`);

			this.$emit("fieldA", obj);
		}
	},
	mounted() {
		this.mounted = true;
	},
	watch: {
		$route() {
			// table bugs out after tab change, refresh it on tab changes to fix
			const table = get(this.$refs, "table.$refs.table");
			if (table) table.doLayout();
		}
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
