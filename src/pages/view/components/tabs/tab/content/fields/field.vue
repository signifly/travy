<template>
	<div class="view-field" :style="{width}">
		<field v-bind="[field, {alt}]" />
	</div>
</template>

<script>
import field from "@/components/field";

export default {
	components: {field},
	props: {
		field: {type: Object, required: true},
		alt: {type: Object, required: true}
	},
	computed: {
		fWidth: (t) => t.field.width || 100,
		width: (t) =>
			t.fWidth === 100 ? `${t.fWidth}%` : `calc(${t.fWidth}% - 1em)`
	}
};
</script>

<style lang="scss" scoped>
.view-field {
}
</style>
