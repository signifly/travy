<template>
	<div class="group">
		<div class="name" v-text="group.name" />

		<div class="fields">
			<field
				v-for="field in group.fields"
				:key="field.attribute"
				v-bind="{field, data, options}"
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
		options: {type: Object, required: false},
		group: {type: Object, required: true},
		data: {type: Object, required: true}
	}
};
</script>

<style lang="scss" scoped>
.group {
	margin-bottom: 32px;

	.name {
		text-transform: uppercase;
		margin-bottom: 1em;
		font-weight: 600;
		font-size: 12px;
	}

	.fields {
		margin: -$fieldMargin 0;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
}
</style>
