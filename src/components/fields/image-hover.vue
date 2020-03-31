<template>
	<div
		@mouseleave="active = false"
		@mouseover="active = true"
		:class="{noimage: !src}"
		class="image"
	>
		<i class="el-icon-picture-outline-round" />

		<transition name="img">
			<div class="img" v-if="active">
				<img :src="src" />
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	meta: {
		spec: "props",
		res: {
			props: {
				src: "https://picsum.photos/id/135/200/200"
			}
		}
	},
	props: {
		src: {type: String, required: false}
	},
	data() {
		return {
			active: false
		};
	}
};
</script>

<style lang="scss" scoped>
.image {
	position: relative;
	display: inline-block;
	font-size: 1.5em;
	overflow: visible;

	&.noimage {
		opacity: 0.5;
	}

	i {
		background-color: $white2;
		border: 1px solid $blue3;
		border-radius: 4px;
		font-size: 18px;
		padding: 0.2em;
		color: $blue1;
	}

	.img {
		display: flex;
		z-index: 2;
		position: absolute;
		right: 60px;
		top: 0;
		bottom: 0;
		align-items: center;
		width: 120px;

		$t: 0.15s;

		&-enter-active,
		&-leave-active {
			transition: cubic(opacity, $t), cubic(transform, $t);
		}
		&-enter,
		&-leave-to {
			opacity: 0;
			transform: translateX(5px) scale(0.98);
		}

		img {
			border-radius: 4px;
		}
	}
}
</style>
