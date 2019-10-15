<template>
	<div class="expand">
		<div class="fields">
			<field
				v-for="field in expand.fields"
				v-bind="{field, data}"
				:key="field.attribute"
				@event="$emit('event', $event)"
			/>
		</div>
	</div>
</template>

<script>
import field from "@/components/field";

export default {
	components: {field},
	props: {
		expand: {type: Object, required: true},
		data: {type: Object, required: true}
	}
};
</script>

<style lang="scss" scoped>
.expand {
	background-color: $white1;
	font-size: 16px;
	padding: 1em 2.5em;

	.fields {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
}
</style>
