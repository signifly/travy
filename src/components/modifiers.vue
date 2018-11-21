<template>
	<div class="modifiers">
		<field
			v-for="field in modifiers"
			:key="field.name"
			v-bind="[field, {alt: {data: queryData, modifier: true}}]"
			@fieldA="fieldA"
		/>
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
	width: 100%;
	max-width: 600px;
	display: flex;
	justify-content: space-between;
	// transition: cubic(opacity, 0.3s);
}
</style>
