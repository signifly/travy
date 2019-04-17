<template>
	<div class="text" :class="`align-${_align}`">
		<div class="title" :class="statusC" v-text="textC" />
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
				status: "primary"
			},
			data: {
				text: "some text",
				subtitle: "a subtitle",
				status: "warning"
			}
		}
	},
	props: {
		_align: {type: String, default: "left", doc: true},
		text: {type: [String, Number], required: false, doc: true},
		subtitle: {type: [String, Number], required: false, doc: true},
		_textDefault: {type: [String, Number], required: false, doc: true},

		status: {
			type: String,
			required: false,
			doc: true,
			note: `danger, warning, info, primary, success or mapped property`
		},

		_status: {
			type: String,
			required: false,
			note: `danger, warning, info, primary, success`
		}
	},
	computed: {
		textC: (t) => toString(t.text) || t._textDefault || "—",
		statusC() {
			const map = !["danger", "warning", "info", "primary", "success"].includes(
				this._status
			);

			return map ? this.status : this._status;
		}
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
