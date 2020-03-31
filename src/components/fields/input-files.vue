<template>
	<div class="input-files">
		<filepond
			:accepted-file-types="fileTypes"
			:allow-multiple="multiple"
			:label-idle="label"
			:max-files="limit"
			:server="server"
		/>
	</div>
</template>

<script>
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
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
				url: "/signedurls",
				value: "{files}"
			}
		}
	},
	props: {
		fileTypes: {type: String, required: false, note: "image/png, image/*"},
		multiple: {type: Boolean, required: false},
		limit: {type: Number, default: null},
		value: {type: Array, required: false},
		url: {type: String, required: true}
	},
	data() {
		return {
			server: {
				process: async (name, file, metadata, load, error, progress) => {
					try {
						const {
							data: {data}
						} = await this.$axios.post(this.url, {
							content_type: file.type
						});

						// eslint-disable-next-line no-unused-vars
						const {Host, ...headers} = data.headers;

						await axios({
							method: "put",
							url: data.url,
							data: file,
							headers,
							onUploadProgress(e) {
								progress(e.lengthComputable, e.loaded, e.total);
							}
						});

						const item = {
							content_type: file.type,
							filename: file.name,
							uuid: data.uuid
						};

						load(item);
						this.update([...(this.value || []), item]);
					} catch (err) {
						console.error(err);
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

<style lang="scss" scoped>
@import "~filepond/dist/filepond.min.css";
@import "~filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
</style>
