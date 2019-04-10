<template>
	<div class="actions" v-if="actions.length">
		<viewAction v-for="action in actions" :key="action.title" v-bind="[action, {data}]" @fieldA="$emit('fieldA', $event)"/>
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
