<template>
	<div class="input-image" :class="{disabled: !_upload}">
		<div class="wrap">
			<Upload
			class="upload"
			drag
			action=""
			:before-upload="preventAction"
			:show-file-list="false"
			:on-change="addFile"
			:disabled="!_upload">
				<div class="image">
					<div class="img" :style="{backgroundImage: `url(${imageUrl})`}" />
					<div class="icon"><i class="el-icon-upload"/></div>
				</div>
			</Upload>

			<a class="clear" v-if="image" @click="removeFile">
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
				url: "image",
				file: "image_file"
			},
			data: {
				image: "https://pbs.twimg.com/media/DVnfJkqVAAAqS91.jpg"
			}
		}
	},
	props: {
		_upload: {type: Boolean, required: false, default: true, doc: true},
		url: {type: String, required: false, doc: true},
		file: {type: Object, required: false, doc: true, note: "base64"},
		_file: {type: String, required: false}

	},
	data() {
		return {
			image: null,

			data: {
				file: this.file
			}
		}
	},
	computed: {
		imageUrl() {
			return this.image || require("!file-loader!@/assets/icons/noimage.svg");
		}
	},
	methods: {
		preventAction: () => false,

		async addFile(file) {
			const base64 = await base64Encode(file.raw);

			this.image = file.url;
			this.update({file: base64, title: file.name});
		},

		removeFile() {
			this.image = null;
			this.update(null);
		},

		update(res) {
			this.$emit("fieldA", {
				action: "update",
				data: {[this._file]: res}
			});
		}
	},
	created() {
		this.$watch("url", (url) => this.image = url, {immediate: true});
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
	.upload {
		/deep/ {
			.el-upload {
				.el-upload-dragger {
					width: auto;
					height: auto;
					border: 0;
					border-radius: 0;

					.input-image.disabled & {
						cursor: default;
					}
				}
			}
		}
	}

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
			border: 0;
			border-radius: 0;
			box-shadow: 0 4px 6px 0 rgba(94,109,130,0.07);
		}

		.input-image.line & {
			border: 0;
			border-radius: 0;
			width: 3em;
			height: 4.5em;
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

			.input-image.line & {
				font-size: 0.8em;
			}

			.input-image.disabled & {
				display: none;
			}

			.input-image:hover & {
				opacity: 1;
				transform: translateY(0);
			}

			.el-icon-upload {
				line-height: inherit;
				font-size: inherit;
				color: inherit;
				margin: 0;
			}
		}
	}

	.clear {
		position: absolute;
		top: 1px;
		right: 1px;
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

		.input-image.view-head & {
			border-top-right-radius: 0px;
			top: 0;
			right: 0;
		}

		.input-image.line & {
			font-size: 0.85em;
			border-top-right-radius: 0px;
			top: 0;
			right: 0;
		}

		.input-image.disabled & {
			display: none;
		}

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
