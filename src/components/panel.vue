<template>
	<div class="panel-comp">
		<div class="wrap loading">
			<slot />
			<transition name="overlay">
				<div class="overlay" v-if="loading" />
			</transition>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		loading: {type: Boolean, required: false}
	}
};
</script>

<style lang="scss" scoped>
.panel-comp {
	position: fixed;
	margin: 0 auto;
	z-index: 1;
	bottom: 0;
	right: 0;
	left: 0;

	.wrap {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: $white1;
		border-top: 1px solid $blue3;
		height: em(60);
		padding: 0 1em;
	}

	.overlay {
		background-color: rgba($white1, 0.7);
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;

		&-enter-active,
		&-leave-active {
			transition: cubic(opacity, 0.2s);
		}
		&-enter,
		&-leave-to {
			opacity: 0;
		}
	}
}
</style>
