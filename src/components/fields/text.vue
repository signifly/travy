<template>
	<div class="text" :class="`align-${_align}`">
		<div class="title" :class="_status" v-text="textFinal" />
		<div class="subtitle" v-if="subtitle" v-text="subtitle" />
	</div>
</template>

<script>
import {toString} from "lodash";

export default {
	meta: {
		res: {
			props: {
				text: "text",
				textDefault: "default text",
				subtitle: "subtitle",
				align: "right"
			},
			data: {
				text: "some text",
				subtitle: "a subtitle"
			}
		}
	},
	props: {
		_align: {type: String, default: "left", doc: true},
		text: {type: [String, Number], required: false, doc: true},
		subtitle: {type: [String, Number], required: false, doc: true},
		_textDefault: {type: [String, Number], required: false, doc: true},

		_status: {
			type: String,
			required: false,
			doc: true,
			note: `danger, warning, info, primary, success`,
			validator: function(value) {
				return ["danger", "warning", "info", "primary", "success"].includes(
					value
				);
			}
		}
	},
	computed: {
		textFinal: (t) => toString(t.text) || t._textDefault || "—"
	}
};
</script>

<style lang="scss" scoped>
.text {
	&.align {
		&-left {
			text-align: left;
		}

		&-right {
			text-align: right;
		}
	}

	.title {
		&.danger {
			color: $danger;
		}
		&.warning {
			color: $warning;
		}
		&.info {
			color: $info;
		}
		&.primary {
			color: $primary;
		}
		&.success {
			color: $success;
		}
	}

	.subtitle {
		font-style: italic;
		font-size: 14px;
		color: #8492a6;
	}
}
</style>
