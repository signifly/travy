<template>
	<div class="image" v-if="image" @mouseover="active = true" @mouseleave="active = false">
		<i class="el-icon-picture"/>
		<transition name="img">
			<div class="img" v-if="active">
				<img :src="image">
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	meta: {
		res: {
			props: {
				image: "imageUrl"
			},
			data: {
				imageUrl: "http://via.placeholder.com/200x200"
			}
		}
	},
	props: {
		image: {type: String, required: false, doc: true}
	},
	data() {
		return {
			active: false
		}
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

		&-enter-active, &-leave-active {
			transition: cubic(opacity, $t), cubic(transform, $t);
		}
		&-enter, &-leave-to {
			opacity: 0;
			transform: translateX(5px) scale(0.98);
		}

		img {
			border-radius: 4px;
		}
	}
}
</style>
