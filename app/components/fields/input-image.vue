<template>
	<div class="input-image">
		<div class="wrap">
			<Upload
			class="upload"
			action=""
			:before-upload="preventAction"
			:show-file-list="false"
			:on-change="addFile">
				<div class="image">
					<div class="img" :style="{backgroundImage: `url(${imageUrl})`}" />
					<div class="icon"><i class="el-icon-upload"/></div>
				</div>
			</Upload>

			<a class="clear" v-if="data.image" @click="removeFile">
				<i class="el-icon-remove"/>
			</a>
		</div>
	</div>
</template>

<script>
import {Upload} from "element-ui";
import {base64Encode} from "@/modules/utils";

export default {
	components: {Upload},
	meta: {
		res: {
			props: {
				image: "image",
				base64: "image_raw"
			},
			data: {
				image: "https://pbs.twimg.com/media/DVnfJkqVAAAqS91.jpg"
			}
		}
	},
	props: {
		image: {type: String, required: false, doc: true, note: "url"},
		base64: {type: String, required: false, doc: true, note: "base64 encoded"},
		_base64: {type: String, required: true}

	},
	data() {
		return {
			data: {
				image: this.image
			}
		}
	},
	computed: {
		imageUrl() {
			return this.data.image || require("!file-loader!@/assets/icons/noimage.svg");
		}
	},
	methods: {
		preventAction: () => false,

		async addFile(file) {
			this.data.image = file.url;
			this.update(await base64Encode(file.raw));
		},

		removeFile() {
			this.data.image = null;
			this.update("");
		},

		update(file) {
			this.$emit("fieldA", {
				action: "update",
				data: {[this._base64]: file}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
$t: 0.2s;

.input-image {
	display: inline-block;
	position: relative;
}

.wrap {
	.image {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		$s: em(160);
		width: $s;
		height: $s;
		border-radius: 4px;
		border: 1px dashed $blue3;
		overflow: hidden;

		.input-image.view-head & {
			border: 0px;
			border-radius: 0px;
			box-shadow: 0 4px 6px 0 rgba(94,109,130,0.07);

		}

		.img {
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			background-repeat: no-repeat;
			background-position: center;
			background-size: cover;
		}

		.icon {
			position: relative;
			$s: em(30);
			width: $s;
			height: $s;
			font-size: 1em;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;

			color: $white1;
			background-color: transparentize($blue5, 0.1);

			opacity: 0;
			transform: translateY(-3px);

			transition: cubic(opacity, $t), cubic(transform, $t);

			.input-image:hover & {
				opacity: 1;
				transform: translateY(0);
			}
		}
	}

	.clear {
		position: absolute;
		top: 1.2px;
		right: 1.2px;
		background-color: $danger;
		color: $white1;
		display: flex;
		align-items: flex-start;
		justify-content: flex-end;

		$p: 4px;
		padding-top: $p;
		padding-right: $p;

		$s: 1.8em;
		width: $s;
		height: $s;

		border-top-right-radius: 4px;
		clip-path: polygon(0 0, 100% 100%, 100% 0);

		opacity: 0;
		transition: cubic(opacity, $t);

		.input-image:hover & {
			opacity: 1;
			transform: translateY(0);
		}

		i {
			font-size: 0.7em;
		}
	}
}
</style>
