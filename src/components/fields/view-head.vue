<template>
	<div class="view-head" :class="{image: _imageActive}">
		<vInputImage
			v-if="_imageActive"
			class="view-head"
			v-bind="{_file, url: image}"
			@fieldA="fieldA"
		/>

		<div class="info">
			<div class="title">
				<div class="text">{{title}}</div>
				<Tag size="small">{{tag}}</Tag>
			</div>
		</div>
	</div>
</template>

<script>
const noimage = require("!file-loader!@/assets/icons/noimage.svg");
import {vInputImage} from "./index";
import {Tag} from "element-ui";

export default {
	components: {Tag, vInputImage},
	meta: {
		res: {
			props: {
				title: "title",
				imageActive: true,
				image: "image",
				file: "image_raw",
				tag: "tag"
			},
			data: {
				title: "a title",
				image: "https://pbs.twimg.com/media/DVnfJkqVAAAqS91.jpg",
				tag: "1432"
			}
		}
	},
	props: {
		title: {type: String, required: false, doc: true},
		_file: {type: String, required: false, doc: true, note: `base64 encoded`},
		image: {type: String, required: false, default: noimage, doc: true, note: "url"},
		_imageActive: {type: Boolean, required: false, doc: true, note: `
			Whether an image or placeholder should be shown.
		`},
		tag: {type: [String, Number], required: true, doc: true}
	},
	methods: {
		fieldA(obj) {
			this.$emit("fieldA", obj);
		}
	}
};
</script>

<style lang="scss" scoped>
.view-head {
	display: flex;

	&.image {
		.info {
			margin-left: 2em;
		}
	}

	.info {
		margin-top: 1em;

		.title {
			display: flex;
			align-items: center;

			.text {
				font-size: em(20);
				margin-right: 0.75em;
			}
		}
	}
}
</style>
