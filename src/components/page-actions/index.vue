<template>
	<div class="actions" v-if="actions.length">
		<pageAction
			@event="$emit('event', $event)"
			v-for="action in actions"
			:key="action.name"
			v-bind="action"
			:data="data"
		/>
	</div>
</template>

<script>
import pageAction from "./action.vue";

export default {
	components: {pageAction},
	props: {
		actions: {type: Array, required: true},
		data: {type: Object, required: false}
	}
};
</script>

<style lang="scss" scoped>
.actions {
	display: flex;
}
</style>
