<template>
	<div class="actions" v-if="actions.length">
		<viewAction
			@event="$emit('event', $event)"
			v-for="action in actions"
			:key="action.name"
			v-bind="action"
			:data="data"
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
