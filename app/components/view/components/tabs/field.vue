<template>
	<div class="field" :class="id">
		<vField
			ref="field"
			v-bind="field"
			:alt="{data, errors, type: 'view-tab'}"
			@fieldA="fieldA"
		/>
	</div>
</template>

<script>
import {get} from "lodash";
import vField from "@/components/field.vue";

export default {
	components: {vField},
	props: {
		field: {type: Object, required: true},
		data: {type: Object, required: true},
		errors: {type: Object, required: false}
	},
	data() {
		return {
			mounted: false
		}
	},
	computed: {
		name: (t) => t.field.name,
		id: (t) => t.field.fieldType.id,

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
.field {
	width: 100%;
	margin-bottom: 1.5em;

	&.vInputNumber, &.vInput {
		width: calc(50% - 1em);
	}
}
</style>
