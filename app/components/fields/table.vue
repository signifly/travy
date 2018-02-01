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
	props: {
		props: {type: Object, required: true},
		columns: {type: Array, required: true},
		columnsData: {type: Array, required: true}
	},
	computed: {
		vTable: (t) => require("@/components/tables/components/table.vue").default // stuff happens
	},
	data() {
		return {
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
