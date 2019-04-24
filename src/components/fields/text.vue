<template>
	<div class="text" :class="[`align-${_align}`, {subtitle}]">
		<div class="content">
			<div class="title" :class="statusC" v-text="textC" />
			<div class="subtitle" v-if="subtitle" v-text="subtitle" />
		</div>

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
import {Tooltip} from "element-ui";
import {toString} from "lodash";

export default {
	components: {Tooltip},
	meta: {
		res: {
			props: {
				text: "text",
				textDefault: "default text",
				subtitle: "subtitle",
				status: "primary",
				tooltip: "tooltip"
			},
			data: {
				text: "some text",
				subtitle: "a subtitle",
				status: "warning",
				tooltip: "text"
			}
		}
	},
	props: {
		_align: {type: String, default: "left", doc: true},
		tooltip: {type: [String], required: false, doc: true},
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
	display: flex;
	align-items: flex-end;

	&.subtitle {
		align-items: center;
	}

	&.align {
		&-left {
			text-align: left;
		}

		&-right {
			text-align: right;
		}
	}

	.content {
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

	.tooltip {
		margin-left: 0.6em;
		font-size: 0.8em;
	}
}
</style>
