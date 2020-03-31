<template>
	<div class="fields">
		<field
			v-for="field in fields"
			:key="field.attribute"
			:hide="['label']"
			v-bind="{field}"
			:data="__data"
		/>
	</div>
</template>

<script>
import field from "@/components/field";

export default {
	components: {field},
	props: {
		__props: {type: Object, required: true},
		__data: {type: Object, required: true}
	},
	computed: {
		fields: (t) => t.__props.fields
	}
};
</script>

<style lang="scss" scoped>
.fields {
	flex-wrap: wrap;
	margin: -3px 0;
	display: flex;

	.field {
		margin: 3px;
	}
}
</style>
