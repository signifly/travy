<template>
	<div class="actions">
		<div class="action">
			<vAction v-for="action in actions" :key="action.title" v-bind="[action, {endpoints, itemData}]" />
		</div>
	</div>
</template>

<script>
import vAction from "./action.vue";

export default {
	components: {vAction},
	props: {
		endpoints: {type: Object, required: true},
		actions: {type: Array, required: true},
		itemData: {type: [Object, Array], required: false}
	}
};
</script>

<style lang="scss" scoped>
.actions {
	display: flex;
	justify-content: flex-end;
}
</style>
