<template>
	<div class="upload">
		<Upload
			class="upload-el"
			drag
			action=""
			:limit="_limit"
			:on-exceed="limitError"
			:auto-upload="false"
			:accept="_fileTypes"
			:on-change="addFile"
			:on-remove="removeFile"
			multiple
		>
			<i class="el-icon-upload"></i>
			<div class="el-upload__text">
				Drop file here or <em>click to upload</em>
			</div>
			<div class="el-upload__tip" slot="tip">
				{{ _note }}
				<template v-if="_limit">
					, {{ files.length }}/{{ _limit }} selected.
				</template>
				<span class="limit" v-if="limitNote">{{ limitNote }}</span>
			</div>
		</Upload>
	</div>
</template>

<script>
import {Upload} from "element-ui";

export default {
	components: {Upload},
	meta: {
		res: {
			props: {
				_note: "jpg/png files with a size less than 500kb",
				_fileTypes: ".jpg, .jpeg, .png",
				_limit: 10,
				_files: "key"
			}
		}
	},
	props: {
		_note: {type: String, required: false},
		_fileTypes: {type: String, required: false},
		_limit: {type: Number, required: false},
		_files: {type: String, required: true}
	},
	data() {
		return {
			limitNote: false,
			files: []
		};
	},
	methods: {
		addFile({raw}) {
			this.limitNote = false;
			this.files.push(raw);
			this.update();
		},

		removeFile({raw}) {
			const index = this.files.findIndex((x) => x === raw);
			this.files.splice(index, 1);
			this.update();
		},

		update() {
			this.$emit("event", {
				actions: {
					update: {data: {[this._files]: this.files}}
				}
			});
		},

		limitError(files) {
			const rest = this._limit - this.files.length;
			this.limitNote = `${
				files.length
			} files selected, but only ${rest} more can be added.`;
		}
	}
};
</script>

<style lang="scss" scoped>
.upload {
	::v-deep {
		.el-upload,
		.el-upload-dragger {
			width: 100%;
		}

		.el-progress-bar__inner {
			transition: width 0.25s linear;
		}
	}
	.el-upload__tip {
		line-height: 1.5em;
		margin-bottom: 1em;

		.limit {
			margin-left: 0.5em;
			color: $danger;
		}
	}

	.upload-el {
		margin-bottom: 1em;
	}

	.progress {
		height: 19px;
		overflow: hidden;

		&-enter-active,
		&-leave-active {
			transition: cubic(height 0.4s);
		}
		&-enter, &-leave-to /* .fade-leave-active below version 2.1.8 */ {
			height: 0;
		}
	}
}
</style>
