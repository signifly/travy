<template>
	<div class="image" v-if="image">
		<i class="el-icon-picture"></i>
		<div class="img">
			<img :src="image">
		</div>
	</div>
</template>

<script>
export default {
	props: {
		image: {type: String, required: false}
	}
};
</script>

<style lang="scss" scoped>
.image {
	position: relative;
	display: inline-block;
	font-size: 1.5em;
	overflow: visible;

	&:hover {
		.img {
			display: flex;
		}
	}

	.img {
		display: none;
		z-index: 1;
		position: absolute;
		right: 2em;
		top: 0;
		bottom: 0;
		align-items: center;
		width: em(165);
	}
}
</style>
