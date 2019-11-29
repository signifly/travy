<template>
	<div class="image">
		<div class="img" :style="style" :class="{noimage: !src}">
			<div
				v-if="!src"
				class="placeholder"
				v-html="require('@/assets/icons/noimage.svg')"
			/>
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
		display: flex;
		color: $blue2;
		width: 100%;

		&.noimage {
			border: 1px solid $blue2;
			border-radius: 4px;
		}

		.placeholder {
			max-width: 50%;
			display: inline-flex;
			align-items: center;
			justify-content: center;
		}
	}
}
</style>
