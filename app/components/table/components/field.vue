<template>
	<component :is="link ? 'router-link' : 'div'" class="field-wrap" :to="link">
		<vField
			v-bind="column"
			:alt="{endpoints, data, type: 'table'}"
			@fieldA="fieldA"
		/>
	</component>
</template>

<script>
import {endpointUrl} from "@/modules/utils";
import vField from "@/components/field/index.vue";

export default {
	props: {
		endpoints: {type: Object, required: true},
		column: {type: Object, required: true},
		scope: {type: Object, required: true}
	},
	computed: {
		components: (t) => t.$options.components,
		data: (t) => t.scope.row,
		action: (t) => t.column.fieldType.action,
		link() {
			const url = endpointUrl({data: this.data, url: this.action});
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
.field-wrap {
	text-decoration: none;
	color: $black1;

	.field {
		margin: 0;
	}
}
</style>
