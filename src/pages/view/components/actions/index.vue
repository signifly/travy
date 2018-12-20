<template>
	<div class="actions" v-if="actions.length">
		<viewAction v-for="action in actions" :key="action.title" v-bind="[action, {data}]" @fieldA="fieldA"/>
	</div>
</template>

<script>
import viewAction from "./action.vue";

export default {
	components: {viewAction},
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
	text-align: right;
	margin-top: 1em;
	display: flex;
}
</style>
