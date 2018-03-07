<template>
	<div class="editor">
		<editor ref="editor" v-model="data.content" v-bind="{configs}" @input="update"/>
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
		content: {type: String, required: false, doc: true},
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
	computed: {
		nodata: (t) => !t.data.content
	},
	methods: {
		update(content) {
			this.$emit("fieldA", {
				action: "update",
				data: {[this._content]: content}
			});
		}
	},
	watch: {
		$route() {
			// editor bugs out after tab change to editor, refresh it on tab changes to fix
			this.$refs.editor.simplemde.codemirror.refresh();
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
