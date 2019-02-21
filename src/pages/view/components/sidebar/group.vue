<template>
	<div class="group" :class="fieldIds">
		<div class="title" v-text="title"/>

		<div class="fields">
			<field
				ref="field"
				v-for="field in fields"
				:key="field.name"
				v-bind="[field, {alt: fieldAlt}]"
				@fieldA="fieldA"
			/>
		</div>
	</div>
</template>

<script>
import field from "@/components/field";

export default {
	components: {field},
	props: {
		fieldAlt: {type: Object, required: true},
		fields: {type: Array, required: true},
		title: {type: String, required: true},
		id: {type: String, required: true}
	},
	data() {
		return {
			payload: {}
		}
	},
	computed: {
		fieldIds: (t) => t.fields.map(x => x.fieldType.id)
	},
	methods: {
		fieldA($event) {
			this.$emit("fieldA", $event);
		}
	}
};
</script>

<style lang="scss" scoped>
.group {
	background-color: $white1;
	border: 1px solid $blue2;
	border-radius: 4px;
	padding: 1.5em 1.25em;
	padding-bottom: 1.5em;
	margin-bottom: 1.25em;

	.title {
		font-size: 0.9em;
		font-weight: 500;
		padding-bottom: 1.25em;
		padding-left: 0.7em;
	}

	.fields {
		transform: scale(0.95);
		margin: -$fieldMargin 0;
	}
}
</style>
