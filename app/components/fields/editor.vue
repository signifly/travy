<template>
	<div class="editor">
		<editor v-model="data.content" v-bind="{configs}" @input="update"/>
	</div>
</template>

<script>
import editor from "vue-simplemde/src/markdown-editor.vue";

export default {
	components: {editor},
	meta: {
		res: {
			props: {
				content: "markdown"
			},
			data: {
				markdown: "some markdown"
			}
		}
	},
	props: {
		content: {type: String, required: false},
		_content: {type: String, required: true}
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
		update(content) {
			this.$emit("fieldA", {
				action: "update",
				data: {[this._content]: content}
			});
		}
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
