<template>
	<div class="upload">
		<Upload
			class="upload-demo"
			drag
			action=""
			:auto-upload="false"
			:accept="_fileTypes"
			:on-change="addFile"
			:on-remove="removeFile"
			multiple>
			<i class="el-icon-upload"></i>
			<div class="el-upload__text">Drop file here or <em>click to upload</em></div>
			<div class="el-upload__tip" slot="tip">{{_note}}</div>
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
				note: "jpg/png files with a size less than 500kb",
				fileTypes: ".jpg, .jpeg, .png",
				files: "key"
			},
			data: {

			}
		}
	},
	props: {
		_note: {type: String, required: false, doc: true},
		_fileTypes: {type: String, required: false, doc: true},
		_files: {type: String, required: true, doc: true}
	},
	data() {
		return {
			files: []
		}
	},
	methods: {
		addFile({raw}) {
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
		}
	}
};
</script>

<style lang="scss" scoped>
.upload {

}
</style>
