<template>
	<div class="input-file">
		<Upload
			action=""
			ref="upload"
			:auto-upload="false"
			:file-list="fileList"
			:accept="_fileTypes"
			:on-preview="preview"
			:on-change="addFile"
			:on-remove="removeFile"
		>
			<Button type="primary" size="small" v-bind="{loading}">Upload</Button>
			<div slot="tip" class="el-upload__tip" v-if="_note">{{ _note }}</div>
		</Upload>
	</div>
</template>

<script>
import {Upload, Button} from "element-ui";
import {base64Encode} from "@/modules/utils";

export default {
	components: {Upload, Button},
	meta: {
		spec: "props",
		res: {
			props: {
				file: "base64",
				url: "url",
				_note: "jpg/png files with a size less than 500kb",
				_fileTypes: ".jpg, .jpeg, .png"
			},
			data: {
				url: "https://pbs.twimg.com/media/DVnfJkqVAAAqS91.jpg"
			}
		}
	},
	props: {
		file: {type: Object, required: false, note: "base64"},
		_fileTypes: {type: String, required: false},
		_note: {type: String, required: false},
		url: {type: String, required: false}
	},
	data() {
		return {
			loading: false,
			fileList: []
		};
	},
	methods: {
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
			this.fileList = [file];

			this.loading = false;
		},

		removeFile() {
			this.fileList = [];
			this.update(null);
		},

		update(file) {
			this.$emit("event", {
				actions: {
					update: {data: {file}}
				}
			});
		}
	},

	watch: {
		url: {
			immediate: true,
			handler(url) {
				if (url) {
					this.fileList.push({
						url: url,
						name: url.split("/").slice(-1)[0]
					});
				}
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.input-file {
}
</style>
