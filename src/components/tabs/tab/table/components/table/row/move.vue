<template>
	<td v-if="sort.move">
		<div class="move" v-html="require('@/assets/icons/move.svg')" />
	</td>
</template>
<script>
export default {
	props: {
		sort: {type: Object, request: true}
	}
};
</script>
<style lang="scss" scoped>
.move {
	color: #666;
	cursor: grab;
	display: flex;
	align-items: center;
	justify-content: center;

	::v-deep svg {
		width: 1.1em;
		display: inline-flex;
		justify-content: center;
	}
}
</style>
