<template>
	<div class="tab">
		<component :is="`v${type}`" v-bind="{definitions}" :key="id" />
	</div>
</template>

<script>
import vtable from "@/components/table";

export default {
	components: {vtable},
	props: {
		definitions: {type: Object, required: true},
		title: {type: String, required: true},
		type: {type: String, required: true},
		id: {type: String, required: true}
	}
};
</script>

<style lang="scss" scoped>
.tab {
	margin-top: 1em;
}
</style>
