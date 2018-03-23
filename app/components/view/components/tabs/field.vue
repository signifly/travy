<template>
	<vField
		ref="field"
		v-bind="field"
		:alt="{data, options, errors, type: 'view-tab'}"
		@fieldA="fieldA"
	/>
</template>

<script>
import {get} from "lodash";
import vField from "@/components/field/index.vue";

export default {
	components: {vField},
	props: {
		field: {type: Object, required: true},
		data: {type: Object, required: true},
		options: {type: Object, required: true},
		errors: {type: Object, required: false}
	},
	data() {
		return {
			mounted: false
		}
	},
	computed: {
		name: (t) => t.field.name,

		nodata() {
			const field = get(this.$refs, "field", {});
			if (!this.mounted) return false;
			if (field.disabled) return false;
			return field.nodata;
		}
	},
	methods: {
		fieldA(obj) {
			this.$emit("fieldA", obj);
		}
	},
	mounted() {
		this.mounted = true;
	},
	watch: {
		nodata(bool) {
			this.$emit("nodata", {
				id: this.name,
				nodata: bool
			});
		}
	}
};
</script>

<style lang="scss" scoped>

</style>
