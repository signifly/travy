<template>
	<div class="editor">
		<editor v-model="data.content" v-bind="{configs}" @input="update"/>
	</div>
</template>

<script>
import {debounce} from "lodash";
import editor from "vue-simplemde/src/markdown-editor.vue";

export default {
	components: {editor},
	props: {
		props: {type: Object, required: true},
		content: {type: String, required: true, default: ""}
	},
	data() {
		return {
			data: {
				content: this.content
			},
			configs: {
				hideIcons: ["image", "fullscreen", "side-by-side"]
			}
		}
	},
	methods: {
		update: debounce(function(content) {
			this.$emit("fieldA", {
				action: "update",
				data: {[this.props.content]: content}
			});
		}, 400)
	}
};
</script>

<style lang="scss" scoped>
@import "~simplemde-theme-base/dist/simplemde-theme-base.min.css";

.editor {
	/deep/ {
		.editor-toolbar {
			background-color: $white2;

			a {
				outline: none;
			}

			&.disabled-for-preview {
				a:not(.no-disable) {
					background-color: $white2;
					color: $blue2 !important;
				}
			}
		}
	}
}
</style>
