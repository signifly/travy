<template>
	<vField
		ref="field"
		v-bind="field"
		:alt="{data, options, errors, type: 'view-tab'}"
		@fieldA="fieldA"
	/>
</template>

<script>
import vField from "@/components/field";

export default {
	components: {vField},
	props: {
		field: {type: Object, required: true},
		data: {type: Object, required: true},
		options: {type: Object, required: false},
		errors: {type: Object, required: false}
	},
	computed: {
		name: (t) => t.field.name
	},
	methods: {
		fieldA(obj) {
			this.$emit("fieldA", obj);
		}
	}
};
</script>

<style lang="scss" scoped>

</style>
