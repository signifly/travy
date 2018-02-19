<template>
	<div class="input-file">
		<Upload
		action=""
		ref="upload"
		:auto-upload="false"
		:file-list="data.fileList"
		:on-change="addFile"
		:on-remove="removeFile">

			<Button type="primary" size="small" v-bind="{loading}">Upload</Button>
			<div slot="tip" class="el-upload__tip" v-if="_note">{{_note}}</div>

		</Upload>
	</div>
</template>

<script>
import {Upload, Button} from "element-ui";
import {base64Encode} from "@/modules/utils";

export default {
	components: {Upload, Button},
	meta: {
		res: {
			props: {
				file: "base64",
				note: "jpg/png files with a size less than 500kb"
			},
			data: {
				base64: ""
			}
		}
	},
	props: {
		file: {type: String, required: false, doc: true, note: "base64"},
		_file: {type: String, required: true},
		_note: {type: String, required: false, doc: true}
	},
	data() {
		return {
			loading: false,

			data: {
				file: this.file,
				fileList: []
			}
		}
	},
	methods: {
		async addFile(file) {
			this.$refs.upload.clearFiles();
			this.loading = true;

			const base64 = await base64Encode(file.raw);
			this.update(base64);
			this.data.fileList = [file];

			this.loading = false;
		},

		removeFile() {
			this.data.fileList = [];
			this.update("");
		},

		update(file) {
			this.$emit("fieldA", {
				action: "update",
				data: {[this._file]: file}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.input-file {

}
</style>
