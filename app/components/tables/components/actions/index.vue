<template>
	<div class="actions">
		<vAction v-for="action in actions" :key="action.title" v-bind="action" :alt="{endpoints}"/>
	</div>
</template>

<script>
import vAction from "./action.vue";

export default {
	components: {vAction},
	props: {
		endpoints: {type: Object, required: true},
		actions: {type: Array, required: true}
	}
};
</script>

<style lang="scss" scoped>
.actions {
	display: flex;
}
</style>
