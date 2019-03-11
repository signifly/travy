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
			multiple>
			<i class="el-icon-upload"></i>
			<div class="el-upload__text">Drop file here or <em>click to upload</em></div>
			<div class="el-upload__tip" slot="tip">
				{{_note}}<template v-if="_limit">, {{files.length}}/{{_limit}} selected.</template>
				<span class="limit" v-if="limitNote">{{limitNote}}</span>
			</div>
		</Upload>

		<transition name="progress">
			<div class="progress" v-if="Number.isInteger(alt.loading)">
				<Progress :text-inside="true" :stroke-width="18" :percentage="alt.loading">{{alt.loading}}</Progress>
			</div>
		</transition>


	</div>
</template>

<script>
import {Upload, Progress} from "element-ui";

export default {
	components: {Upload, Progress},
	meta: {
		res: {
			props: {
				note: "jpg/png files with a size less than 500kb",
				fileTypes: ".jpg, .jpeg, .png",
				limit: 10,
				files: "key"
			},
			data: {

			}
		}
	},
	props: {
		alt: {type: Object, required: true},
		_note: {type: String, required: false, doc: true},
		_fileTypes: {type: String, required: false, doc: true},
		_limit: {type: Number, required: false, doc: true},
		_files: {type: String, required: true, doc: true}
	},
	data() {
		return {
			limitNote: false,
			files: []
		}
	},
	methods: {
		addFile({raw}) {
			this.limitNote = false;
			this.files.push(raw);
			this.update();
		},

		removeFile({raw}) {
			const index = this.files.findIndex(x => x === raw);
			this.files.splice(index, 1);
			this.update();
		},

		update() {
			this.$emit("fieldA", {
				action: "update",
				data: {[this._files]: this.files}
			});
		},

		limitError(files) {
			const rest = this._limit - this.files.length;
			this.limitNote = `${files.length} files selected, but only ${rest} more can be added.`;
		}
	}
};
</script>

<style lang="scss" scoped>
.upload {
	::v-deep {
		.el-upload, .el-upload-dragger {
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

		&-enter-active, &-leave-active {
			transition: cubic(height 0.4s);
		}
		&-enter, &-leave-to /* .fade-leave-active below version 2.1.8 */ {
			height: 0;
		}
	}
}
</style>
