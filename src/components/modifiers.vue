<template>
	<div class="modifiers">
		<field
			v-for="field in fields"
			:key="field.name"
			v-bind="[field, {alt: {data: dataComb, modifier: true}}]"
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
		query: (t) => t.$route.query,
		queryData: (t) => t.query.modifiers,
		dataComb: (t) => ({...t.data, ...t.queryData})
	},
	methods: {
		fieldA({data}) {
			this.update({...this.queryData, ...data});
		},
		update(modifiers) {
			this.$router.replace({query: {...this.query, modifiers}});
			this.$emit("refresh");
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
