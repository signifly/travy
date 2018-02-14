<template>
	<div class="header">
		<div class="fields">
			<vField v-for="field in fields" v-bind="field" :data="data" :key="field.name" />
		</div>
	</div>
</template>

<script>
import vField from "@/components/field.vue";

export default {
	components: {vField},
	props: {
		header: {type: Object, required: true},
		data: {type: Object, required: true}
	},
	computed: {
		fields: (t) => t.header.fields
	}
};
</script>

<style lang="scss" scoped>
.header {
	margin-bottom: 2em;
}
</style>
