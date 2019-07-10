<template>
	<div class="editor" :class="{disabled: _disabled}">
		<div class="overlay" v-if="_disabled" />
		<editor ref="editor" v-bind="{configs, value}" @input="update" />
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
				content: "markdown",
				disabled: true
			},
			data: {
				markdown: "some markdown"
			}
		}
	},
	props: {
		_disabled: {type: Boolean, required: false, doc: true},
		content: {type: String, required: false, doc: true},
		_content: {type: String, required: true}
	},
	data() {
		return {
			init: false,
			configs: {
				spellChecker: false,
				hideIcons: ["image", "fullscreen", "side-by-side"]
			}
		};
	},
	computed: {
		value: (t) => t.content || ""
	},
	methods: {
		update(content) {
			// fix initial update
			if (!this.init) return (this.init = true);

			this.$emit("event", {
				actions: {
					update: {data: {[this._content]: content}}
				}
			});
		}
	},
	watch: {
		$route() {
			this.$refs.editor.simplemde.codemirror.refresh();
		}
	}
};
</script>

<style lang="scss" scoped>
.editor {
	position: relative;

	.overlay {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		z-index: 2;
	}

	&.disabled {
		::v-deep {
			.CodeMirror {
				background-color: transparentize($black1, 0.97);
				color: $blue4;
			}
		}
	}

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
