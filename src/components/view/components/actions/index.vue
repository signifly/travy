<template>
	<div class="actions">
		<vAction
			v-for="action in actions"
			:key="action.title"
			v-bind="action"
			:alt="{data}"
			@fieldA="fieldA"
		/>
	</div>
</template>

<script>
import vAction from "./action.vue";

export default {
	components: {vAction},
	props: {
		actions: {type: Array, required: true},
		data: {type: Object, required: true}
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

}
</style>
