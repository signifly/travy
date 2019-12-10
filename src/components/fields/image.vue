<template>
	<div class="image">
		<div class="img" :style="style" :class="{noimage: !src}">
			<i v-if="!src" class="placeholder el-icon-picture-outline-round" />
		</div>
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
				src: "https://picsum.photos/id/135/1000/1000"
			}
		}
	},
	props: {
		_fit: {type: String, default: "cover", note: "contain/cover"},
		_height: {type: String, default: "200px"},
		_width: {type: String, default: "100%"},
		src: {type: String, required: false}
	},
	computed: {
		style: (t) => ({
			backgroundImage: `url('${t.src}')`,
			backgroundSize: t._fit,
			height: t._height,
			width: t._width
		})
	}
};
</script>

<style lang="scss" scoped>
.image {
	.img {
		background-repeat: no-repeat;
		background-position: center;
		justify-content: center;
		align-items: center;
		border-radius: 4px;
		display: flex;
		color: $blue2;
		width: 100%;

		&.noimage {
			background-color: $blue6;
		}

		.placeholder {
			font-size: 24px;
			color: $blue4;
		}
	}
}
</style>
