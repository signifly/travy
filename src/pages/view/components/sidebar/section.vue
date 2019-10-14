<template>
	<div class="section">
		<div class="name" v-text="section.name" />

		<div class="fields">
			<field
				v-for="field in section.fields"
				:key="field.name"
				v-bind="{field, data, options}"
				type="fields"
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
		section: {type: Object, required: true},
		data: {type: Object, required: true}
	},
	data() {
		return {
			payload: {}
		};
	}
};
</script>

<style lang="scss" scoped>
.section {
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
