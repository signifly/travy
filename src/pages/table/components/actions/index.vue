<template>
	<div class="actions">
		<tableAction
			v-for="action in actions"
			:key="action.title"
			v-bind="[action, {parentData}]"
			@fieldA="fieldA"
		/>
	</div>
</template>

<script>
import tableAction from "./action.vue";

export default {
	components: {tableAction},
	props: {
		actions: {type: Array, required: true},
		parentData: {type: Object, required: false}
	},
	methods: {
		fieldA(obj) {
			this.$emit("fieldA", obj);
		}
	}
};
</script>

<style lang="scss" scoped>
.actions {
	display: flex;
}
</style>
