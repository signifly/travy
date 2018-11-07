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
	data() {
		return {
			mounted: false
		}
	},
	computed: {
		name: (t) => t.field.name,
		nodata: (t) => t.mounted ? t.$refs.field.nodata : false
	},
	methods: {
		fieldA(obj) {
			this.$emit("fieldA", obj);
		}
	},
	mounted() {
		this.mounted = true;
	}
};
</script>

<style lang="scss" scoped>

</style>
