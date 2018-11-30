<template>
	<div class="items">
		<item v-for="item in items" v-bind="item" :key="item.id" @updateItem="$emit('updateItem', $event)"/>
	</div>
</template>

<script>
import item from "./item";

export default {
	components: {item},
	props: {
		items: {type: Array, required: true}
	}
};
</script>

<style lang="scss" scoped>
.items {
	overflow: auto;
	height: 600px;
	max-height: calc(100vh - 15em);
}
</style>
