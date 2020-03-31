<template>
	<div class="text" :class="[`align-${align}`, {subtitle}]">
		<div class="content">
			<div
				v-text="text || '-'"
				:style="textStyle"
				:class="status"
				class="title"
			/>
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

export default {
	components: {Tooltip},
	meta: {
		spec: "props",
		res: {
			props: {
				subtitle: "{subtitle}",
				tooltip: "{tooltip}",
				text: "{text}",
				textStyle: {
					textDecoration: "line-through"
				}
			},
			data: {
				subtitle: "a subtitle",
				status: "warning",
				text: "some text",
				tooltip: "text"
			}
		}
	},
	props: {
		subtitle: {type: [String, Number], required: false},
		text: {type: [String, Number], required: false},
		textStyle: {type: Object, required: false},
		tooltip: {type: String, required: false},
		status: {type: String, required: false},
		align: {type: String, default: "left"}
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
