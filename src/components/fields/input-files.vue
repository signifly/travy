<template>
	<div class="input-files">
		<filepond
			:label-idle="label"
			:allow-multiple="_multiple"
			:max-files="_limit"
		/>
	</div>
</template>

<script>
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond/dist/filepond.min.css";
import Filepond from "vue-filepond";

const filepond = Filepond(FilePondPluginImagePreview);

export default {
	components: {filepond},
	meta: {
		spec: "props",
		res: {
			props: {
				value: "files"
			}
		}
	},
	props: {
		_multiple: {type: Boolean, required: false},
		_limit: {type: Number, default: null}
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
