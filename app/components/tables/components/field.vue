<template>
	<component :is="link ? 'router-link' : 'div'" class="field" :to="link">
		<vField
			v-bind="column"
			:alt="{endpoints, data, type: 'table'}"
			@fieldA="fieldA"
		/>
	</component>
</template>

<script>
import {endpointUrl} from "@/modules/utils";
import vField from "@/components/field.vue";

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
		link: (t) => endpointUrl({data: t.data, url: t.action})
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
.field {
	text-decoration: none;
	color: $black1;
}
</style>
