<template>
	<div class="input-files">
		<filepond
			:accepted-file-types="_fileTypes"
			:allow-multiple="_multiple"
			:label-idle="label"
			:max-files="_limit"
			:server="server"
		/>
	</div>
</template>

<script>
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond/dist/filepond.min.css";
import Filepond from "vue-filepond";
import axios from "axios";

const filepond = Filepond(
	FilePondPluginImagePreview,
	FilePondPluginFileValidateType
);

export default {
	components: {filepond},
	meta: {
		spec: "props",
		res: {
			props: {
				_url: "/signedurls",
				value: "files"
			}
		}
	},
	props: {
		_fileTypes: {type: String, required: false, note: "image/png, image/*"},
		_multiple: {type: Boolean, required: false},
		_limit: {type: Number, default: null},
		value: {type: Array, required: false},
		_url: {type: String, required: true}
	},
	data() {
		return {
			server: {
				process: async (name, file, metadata, load, error, progress) => {
					try {
						const {data} = (await this.$axios.get(this._url)).data;

						await axios({
							method: "put",
							url: data.url,
							data: file,
							onUploadProgress(e) {
								progress(e.lengthComputable, e.loaded, e.total);
							}
						});

						const item = {
							"content-type": file.type,
							filename: file.name,
							uuid: data.uuid
						};

						load(item);
						this.update([...(this.value || []), item]);
					} catch (err) {
						error(err);
					}
				},

				revert: (item, load) => {
					this.update(this.value.filter((x) => x.uuid !== x.uuid));
					load();
				}
			}
		};
	},
	computed: {
		label() {
			return this.$translate({
				en: "Drop files here...",
				da: "Drop filer her..."
			});
		}
	},
	methods: {
		update(value) {
			this.$emit("event", {
				actions: {
					update: {data: {value}}
				}
			});
		}
	}
};
</script>
