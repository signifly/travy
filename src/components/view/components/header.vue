<template>
	<div class="header">
		<div class="fields">
			<vField
				v-for="field in fields"
				:key="field.name"
				v-bind="field"
				:alt="{data}"
				@fieldA="fieldA"
			/>
		</div>
	</div>
</template>

<script>
import vField from "@/components/field/index.vue";

export default {
	components: {vField},
	props: {
		header: {type: Object, required: true},
		data: {type: Object, required: true}
	},
	computed: {
		fields: (t) => t.header.fields
	},
	methods: {
		fieldA(obj) {
			this.$emit("fieldA", obj);
		}
	}
};
</script>

<style lang="scss" scoped>
.header {
	margin-bottom: 2em;
}
</style>
