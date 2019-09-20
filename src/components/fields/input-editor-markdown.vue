<template>
	<div class="editor" :class="{disabled: _disabled}">
		<div class="overlay" v-if="_disabled" />
		<editor ref="editor" v-bind="{configs, value}" @input="update" />
	</div>
</template>

<script>
import "simplemde-theme-base/dist/simplemde-theme-base.min.css";
import editor from "vue-simplemde";

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
		_disabled: {type: Boolean, required: false},
		content: {type: String, required: false}
	},
	data() {
		return {
			configs: {
				status: false,
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
			if (this.value === content) return;

			this.$emit("event", {
				actions: {
					update: {data: {content}}
				}
			});
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
