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
import {endpointUrl} from "@/modules/utils";
import vField from "@/components/field";

export default {
	props: {
		column: {type: Object, required: true},
		scope: {type: Object, required: true}
	},
	computed: {
		data: (t) => t.scope.row,
		onClick: (t) => t.column.onClick,
		link() {
			const url = endpointUrl({data: this.data, url: this.onClick});
			return url ? {path: url, query: {modifiers: this.$route.query.modifiers}} : false;
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
