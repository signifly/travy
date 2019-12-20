<template>
	<div class="group">
		<div class="name" v-text="group.name" />

		<div class="fields">
			<field
				v-bind="{field, data, options}"
				@event="$emit('event', $event)"
				v-for="field in group.fields"
				:key="field.attribute"
				margin="0.5em 0"
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
	margin-bottom: 50px;

	&:last-child {
		margin-bottom: 10px;
	}

	.name {
		text-transform: uppercase;
		margin-bottom: 0.75em;
		font-weight: 600;
		font-size: 12px;
	}

	.fields {
		justify-content: space-between;
		transform: scale(0.95);
		margin: -0.5em -2.5%;
		flex-wrap: wrap;
		display: flex;
	}
}
</style>
