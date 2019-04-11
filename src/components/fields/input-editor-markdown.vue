<template>
	<div class="editor">
		<editor ref="editor" v-model="data.content" v-bind="{configs}" @input="update"/>
	</div>
</template>

<script>
import editor from "vue-simplemde/src/markdown-editor.vue";
import "simplemde-theme-base/dist/simplemde-theme-base.min.css";

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
			init: false,
			data: {
				content: this.content
			},
			configs: {
				spellChecker: false,
				hideIcons: ["image", "fullscreen", "side-by-side"]
			}
		}
	},
	methods: {
		update(content) {
			// fix initial update
			if (!this.init) return this.init = true;

			this.$emit("event", {
				actions: {
					update: {data: {[this._content]: content}}
				}
			});
		}
	},
	watch: {
		$route() {
			this.$refs.editor.simplemde.codemirror.refresh();
		}
	}
};
</script>

<style lang="scss" scoped>
.editor {
	::v-deep {
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

		.CodeMirror {
			font-size: 14px;
		}
	}
}
</style>
