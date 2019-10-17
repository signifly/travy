<template>
	<div class="actions" v-if="actions.length">
		<viewAction
			@event="$emit('event', $event)"
			v-for="action in actions"
			v-bind="{action, data}"
			:key="action.name"
		/>
	</div>
</template>

<script>
import viewAction from "./action.vue";

export default {
	components: {viewAction},
	props: {
		actions: {type: Array, required: true},
		data: {type: Object, required: true}
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
