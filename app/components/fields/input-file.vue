<template>
	<div class="input-file">
		<Upload
		action=""
		ref="upload"
		:auto-upload="false"
		:file-list="data.fileList"
		:accept="_fileTypes"
		:on-preview="preview"
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
				url: "url",
				note: "jpg/png files with a size less than 500kb",
				fileTypes: ".jpg, .jpeg, .png"
			},
			data: {
				base64: "",
				url: "https://pbs.twimg.com/media/DVnfJkqVAAAqS91.jpg"
			}
		}
	},
	props: {
		file: {type: String, required: false, doc: true, note: "base64"},
		url: {type: String, required: false, doc: true},
		_file: {type: String, required: true},
		_note: {type: String, required: false, doc: true},
		_fileTypes: {type: String, required: false, doc: true}
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
		preview({url}) {
			if (!url.startsWith("blob")) {
				window.open(url, "_blank");
			}
		},

		async addFile(file) {
			this.$refs.upload.clearFiles();
			this.loading = true;

			const base64 = await base64Encode(file.raw);
			this.update({file: base64, title: file.name});
			this.data.fileList = [file];

			this.loading = false;
		},

		removeFile() {
			this.data.fileList = [];
			this.update();
		},

		update(obj) {
			this.$emit("fieldA", {
				action: "update",
				data: {[this._file]: obj}
			});
		}
	},

	created() {
		if (this.url) {
			this.data.fileList.push({
				url: this.url,
				name: this.url.split("/").slice(-1)[0]
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.input-file {

}
</style>
