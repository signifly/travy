<template>
	<div class="text" :class="{subtitle}">
		<div class="content">
			<div v-if="markdown && text" class="markdown" v-html="renderedMarkdown" />
			<div
				v-else
				v-text="text || fallback || '—'"
				:style="textStyle"
				class="title"
			/>
			<div class="subtitle" v-if="subtitle" v-text="subtitle" />
		</div>

		<a class="copy" :class="{copied}" v-if="copy" @click="copyText">
			<i :class="`el-icon-${copied ? 'check' : 'document-copy'}`" />
		</a>

		<div class="tooltip" v-if="tooltip">
			<Tooltip placement="right">
				<i class="el-icon-info" />
				<div slot="content">
					{{ tooltip }}
				</div>
			</Tooltip>
		</div>
	</div>
</template>

<script>
import marked from "marked";
import DOMPurify from "dompurify";
import {Tooltip} from "element-ui";

export default {
	components: {Tooltip},
	meta: {
		spec: "props",
		res: {
			props: {
				subtitle: "{subtitle}",
				tooltip: "{tooltip}",
				text: "{text}",
				copy: true,
				textStyle: {
					textDecoration: "line-through",
					textAlign: "left"
				}
			},
			data: {
				subtitle: "a subtitle",
				text: "some text",
				tooltip: "text"
			}
		}
	},
	props: {
		textStyle: {type: Object, required: false, note: "vue style binding"},
		subtitle: {type: [String, Number], required: false},
		text: {type: [String, Number], required: false},
		fallback: {type: String, required: false},
		tooltip: {type: String, required: false},
		copy: {type: Boolean, required: false},
		markdown: {type: Boolean, default: false}
	},
	data: () => ({
		copied: false
	}),
	methods: {
		copyText() {
			const el = document.createElement("textarea");
			document.body.appendChild(el);
			el.value = [this.text, this.subtitle].filter((x) => x).join("\n");
			el.select();
			document.execCommand("copy");
			document.body.removeChild(el);

			this.copied = true;

			setTimeout(() => {
				this.copied = false;
			}, 2000);
		}
	},
	computed: {
		renderedMarkdown() {
			const rawHtml = marked(this.text);
			const sanitized = DOMPurify.sanitize(rawHtml);
			return sanitized;
		}
	}
};
</script>

<style lang="scss" scoped>
.text {
	display: flex;
	align-items: flex-end;

	.markdown {
		> :first-child {
			margin-top: 0;
		}
	}

	&.subtitle {
		align-items: center;
	}

	.content {
		.subtitle {
			font-style: italic;
			font-size: 14px;
			color: #8492a6;
		}
	}

	.copy {
		margin-left: 0.6em;
		color: #8492a6;

		&.copied {
			pointer-events: none;
			color: $success;
		}
	}

	.tooltip {
		margin-left: 0.6em;
		font-size: 0.8em;
	}
}
</style>
