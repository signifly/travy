<template>
	<div class="actions">
		<tableAction
			v-for="action in actions"
			:key="action.title"
			v-bind="[action, {parentData}]"
			@event="$emit('event', $event)"
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
	}
};
</script>

<style lang="scss" scoped>
.actions {
	display: flex;
}
</style>
