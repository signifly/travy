<template>
	<div class="modifiers">
		<field
			v-for="field in fields"
			:key="field.name"
			v-bind="[field, {alt: {data: dataComb, modifiers: true}}]"
			@fieldA="fieldA"
		/>
	</div>
</template>

<script>
import field from "./field";

export default {
	components: {field},
	props: {
		data: {type: Object, required: true},
		fields: {type: Array, required: true}
	},
	computed: {
		query: (t) => t.$store.getters["router/query"],
		dataComb: (t) => ({...t.data, ...t.queryData}),
		queryData: (t) => t.query.modifiers,
	},
	methods: {
		fieldA({data}) {
			this.$emit("update", {modifiers: {...this.queryData, ...data}});
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
