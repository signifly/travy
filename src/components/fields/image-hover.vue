<template>
	<div
		class="image"
		v-if="src"
		@mouseover="active = true"
		@mouseleave="active = false"
	>
		<i class="el-icon-picture" />
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
				src: "src"
			},
			data: {
				src: "https://picsum.photos/200/200"
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
