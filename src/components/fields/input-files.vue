<template>
	<div class="input-files">
		<filepond
			:accepted-file-types="_fileTypes"
			:allow-multiple="_multiple"
			:label-idle="label"
			:max-files="_limit"
		/>
	</div>
</template>

<script>
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond/dist/filepond.min.css";
import Filepond from "vue-filepond";

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
	computed: {
		label() {
			return this.$translate({
				en: "Drop files here...",
				da: "Drop filer her..."
			});
		}
	}
};
</script>
