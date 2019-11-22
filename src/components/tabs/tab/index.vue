<template>
	<div class="tab">
		<component
			v-bind="{definitions, parentData: data}"
			@edit="$emit('edit', $event)"
			:is="`v${type}`"
			ref="tab"
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
