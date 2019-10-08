<template>
	<div class="tab">
		<component
			:is="`v${type}`"
			v-bind="{definitions, parentData: data}"
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
	}
};
</script>

<style lang="scss" scoped>
.tab {
	margin: 1.5em 0;
}
</style>
