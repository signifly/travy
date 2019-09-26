<template>
	<div class="progress" :class="status">
		<Tooltip
			:content="`${percentage}%`"
			placement="right"
			transition="trans-fadeRight"
		>
			<Progress class="bar" :percentage="percentage" :show-text="false" />
		</Tooltip>
	</div>
</template>

<script>
import {Progress, Tooltip} from "element-ui";

export default {
	components: {Progress, Tooltip},
	meta: {
		spec: "props",
		res: {
			props: {
				percentage: "percentage",
				status: "status"
			},
			data: {
				percentage: 60,
				status: "warning"
			}
		}
	},
	props: {
		percentage: {type: Number, required: false, default: 0},
		status: {type: String, required: false, default: "primary"}
	}
};
</script>

<style lang="scss" scoped>
.progress {
	width: 100%;
}

::v-deep {
	.el-progress-bar__inner {
		.danger & {
			background-color: $danger;
		}
		.warning & {
			background-color: $warning;
		}
		.info & {
			background-color: $info;
		}
		.primary & {
			background-color: $primary;
		}
		.success & {
			background-color: $success;
		}
	}
}
</style>
