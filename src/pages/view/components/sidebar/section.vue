<template>
	<div class="section" :class="fieldIds">
		<div class="wrap">
			<vField
				ref="field"
				v-for="field in fields"
				:key="field.name"
				v-bind="field"
				:alt="{data}"
				@fieldA="fieldA"
			/>
		</div>
	</div>
</template>

<script>
import vField from "@/components/field";

export default {
	components: {vField},
	props: {
		fields: {type: Array, required: true},
		title: {type: String, required: true},
		data: {type: Object, required: true},
		id: {type: String, required: true}
	},
	data() {
		return {
			mounted: false
		}
	},
	computed: {
		show: (t) => (t.mounted ? t.$refs.field : []).some(x => x.show),
		fieldIds: (t) => t.fields.map(x => x.fieldType.id)
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
.section {
	background-color: $white1;
	border: 1px solid $blue2;
	border-radius: 4px;
	padding: 1.5em 1.25em;
	margin-bottom: 1.25em;

	.wrap {
		transform: scale(0.95);
		margin: -$fieldMargin 0;
	}

	&.vStatusSet {
		padding: 0;

		.wrap {
			transform: none;
		}
	}
}
</style>
