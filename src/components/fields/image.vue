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
				src: "src",
				_width: "100%",
				_height: "300px"
			},
			data: {
				src: "https://picsum.photos/1000/1000"
			}
		}
	},
	props: {
		src: {type: String, required: false},
		_width: {type: String, default: "200px"},
		_height: {type: String, default: "200px"},
		_fit: {type: String, default: "cover", note: "contain/cover"}
	},
	computed: {
		style: (t) => ({
			width: t._width,
			height: t._height,
			backgroundImage: `url('${t.src}')`,
			backgroundSize: t._fit
		})
	}
};
</script>

<style lang="scss" scoped>
.image {
	width: 100%;

	.img {
		background-repeat: no-repeat;
		background-position: center;
		display: flex;
		align-items: center;
		justify-content: center;
		color: $blue2;

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
