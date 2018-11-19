<template>
	<div class="line-image">
		<div class="icon drag">
			<i class="el-icon-rank"></i>
		</div>

		<div class="image">
			<inputImage
				class="line"
				v-bind="{url: image, _file: _imageBase64, _upload: _imageUpload}"
				@fieldA="fieldA"
			/>
		</div>

		<div class="info">
			<div class="item">
				<div class="title">{{_titleKey}}:</div>
				<div class="text">{{titleValue}}</div>
			</div>

			<div class="item">
				<div class="title">{{_infoKey}}:</div>
				<div class="text">{{infoValue}}</div>
			</div>
		</div>

		<actions v-bind="{_actions, alt}" @fieldA="fieldA"/>
	</div>
</template>

<script>
const noimage = require("!file-loader!@/assets/icons/noimage.svg");
import inputImage from "./input-image.vue";
import actions from "./actions.vue";

export default {
	components: {inputImage, actions},
	meta: {
		res: {
			props: {
				image: "image",
				imageUpload: true,
				imageBase64: "image_raw",
				titleKey: "Modal",
				titleValue: "titleValue",
				infoKey: "Variants",
				infoValue: "infoValue",
				actions: [
					{
						title: "Delete",
						props: {
							id: "popup",
							text: "delete this?",
							endpoint: {
								url: "url",
								method: "delete"
							}
						}
					}
				]
			},
			data: {
				image: "https://pbs.twimg.com/media/DVnfJkqVAAAqS91.jpg",
				titleValue: "a modal",
				infoValue: "variants"
			}
		}
	},
	props: {
		alt: {type: Object, required: true},
		image: {type: String, required: false, default: noimage, doc: true},
		_imageUpload: {type: Boolean, required: false, default: true, doc: true},
		imageBase64: {type: Object, required: false, doc: true, note: "base64"},
		_imageBase64: {type: String, required: false},
		_titleKey: {type: String, required: true, doc: true},
		titleValue: {type: String, required: false, doc: true},
		_infoKey: {type: String, required: true, doc: true},
		infoValue: {type: String, required: false, doc: true},
		_actions: {type: Array, required: true, doc: true, note: `<a href="#vActions">vActions</a>`}
	},
	methods: {
		fieldA(obj) {
			this.$emit("fieldA", obj);
		}
	}
}
</script>

<style lang="scss" scoped>
.line-image {
	background-color: $white2;
	border: 1px solid $blue3;
	border-radius: 4px;
	padding: 0 2em;
	display: flex;
	align-items: center;
	margin: 0.25em 0;
	height: em(100);

	.icon {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.25em;
		color: $blue4;
		cursor: grab;
		padding: 1em;
		margin-left: -1em;
		margin-right: 0.5em;
	}

	.image {
		margin-right: 2em;
	}

	.info {
		font-size: em(13);
		color: $blue4;

		.item {
			display: flex;
			align-items: center;
			margin: 0.6em 0;

			.title {
				font-weight: 600;
				min-width: 8em;
			}

			.text {

			}
		}
	}

	> .actions {
		width: 4.5em;
		text-align: right;
		margin-left: auto;

		a {
			text-decoration: none;
			color: $blue5;
		}
	}
}
</style>
