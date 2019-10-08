<template>
	<div class="tab">
		<component
			ref="tab"
			:is="`v${type}`"
			v-bind="{definitions, parentData: data}"
			@edit="$emit('edit', $event)"
			:key="id"
		/>
	</div>
</template>

<script>
import vfields from "./fields";
import vtable from "./table";

export default {
	components: {vfields, vtable},
	props: {
		definitions: {type: Object, required: true},
		data: {type: Object, required: false},
		type: {type: String, required: true},
		id: {type: String, required: true}
	},
	methods: {
		async save() {
			return await (this.$refs.tab.save && this.$refs.tab.save());
		}
	}
};
</script>

<style lang="scss" scoped>
.tab {
	margin: 1.5em 0;
}
</style>
