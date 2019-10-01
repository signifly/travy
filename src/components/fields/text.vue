<template>
	<div class="text" :class="[`align-${_align}`, {subtitle}]">
		<div class="content">
			<div class="title" :class="[statusC, {bold: _bold}]" v-text="textC" />
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
		spec: {
			subtitle: {type: [String, Number], required: false},
			text: {type: [String, Number], required: false},
			tooltip: {type: String, required: false},
			_align: {type: String, default: "left"},
			_bold: {type: Boolean, required: false},
			_fallback: {
				type: Object,
				required: false,
				children: {
					text: {type: [String, Number], required: false},
					status: {type: String, required: false}
				}
			}
		},
		res: {
			props: {
				text: "text",
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
		subtitle: {type: [String, Number], required: false},
		text: {type: [String, Number], required: false},
		_fallback: {type: Object, default: () => ({})},
		tooltip: {type: String, required: false},
		status: {type: String, required: false},
		_align: {type: String, default: "left"},
		_bold: {type: Boolean, required: false}
	},
	computed: {
		statusC: (t) => t.status || t._fallback.status,
		textC: (t) => toString(t.text) || t._fallback.text || "—"
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
			&.bold {
				font-weight: 600;
			}

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
