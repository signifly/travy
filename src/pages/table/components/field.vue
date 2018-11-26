<template>
	<component :is="link ? 'router-link' : 'div'" class="table-field" :to="link">
		<vField
			v-bind="column"
			:alt="{data, type: 'table'}"
			@fieldA="fieldA"
		/>
	</component>
</template>

<script>
import {rStringProps} from "@/modules/utils";
import vField from "@/components/field";

export default {
	props: {
		column: {type: Object, required: true},
		scope: {type: Object, required: true}
	},
	computed: {
		data: (t) => t.scope.row,
		onClick: (t) => t.column.onClick,
		query: (t) => t.$store.getters["router/query"],
		link() {
			const url = rStringProps({data: this.data, string: this.onClick});
			return url ? {path: url, query: {modifiers: this.query.modifiers}} : false;
		}
	},
	methods: {
		fieldA(obj) {
			this.$emit("fieldA", {...obj, item: this.data});
		}
	},
	beforeCreate() {
		this.$options.components.vField = vField;
	}
};
</script>

<style lang="scss" scoped>
.table-field {
	text-decoration: none;
	color: $black1;

	.field {
		margin: 0;
	}
}
</style>
