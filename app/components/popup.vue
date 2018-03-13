<template>
	<transition name="trans-fadeDown">
		<div class="popup" :class="position" :style="{width}">
			<slot />
		</div>
	</transition>
</template>

<script>
export default {
	props: {
		position: {type: String, required: false, default: "bottom-right"},
		width: {type: String, required: false, default: "200px"}
	}
};
</script>

<style lang="scss" scoped>
.popup {
	position: absolute;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	background-color: $white1;
	border-radius: 4px;
	padding: 1em;
	z-index: 1;

	&.bottom-right {
		top: calc(100% + 1em);
		right: 0;
	}
}
</style>
