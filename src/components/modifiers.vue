<template>
	<div class="modifiers">
		<div class="fields">
			<field
				v-for="field in modifiers"
				:key="field.name"
				v-bind="[field, {alt: {data: queryData}}]"
				@fieldA="fieldA"
			/>
		</div>
	</div>
</template>

<script>
import field from "./field";

export default {
	components: {field},
	props: {
		modifiers: {type: Array, required: true}
	},
	computed: {
		query: (t) => t.$route.query,
		queryData: (t) => t.query.modifiers
	},
	methods: {
		fieldA({data}) {
			this.update({...this.queryData, ...data});
		},
		update(modifiers) {
			this.$router.replace({query: {...this.query, modifiers}});
		}
	}
};
</script>

<style lang="scss" scoped>
.modifiers {
	display: flex;
	transition: cubic(opacity, 0.3s);

	&.loading {
		opacity: 0.2;
	}

	.item {
		display: flex;
		align-items: center;
		margin-left: 2em;

		.title {
			margin-right: 1em;
			font-size: em(14);
		}
	}
}
</style>
