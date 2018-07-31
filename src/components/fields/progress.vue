<template>
	<div class="progress" :class="status">
		<Tooltip :content="`${percentage}%`" placement="right" transition="trans-fadeRight">
			<Progress class="bar" :percentage="percentage" :show-text="false" />
		</Tooltip>
	</div>
</template>

<script>
import {Progress, Tooltip} from "element-ui";

export default {
	components: {Progress, Tooltip},
	meta: {
		res: {
			props: {
				percentage: "percentage",
				status: "status"
			},
			data: {
				percentage: 60,
				status: "primary"
			}
		}
	},
	props: {
		percentage: {type: Number, required: false, default: 0, doc: true},
		status: {type: String, required: false, default: "danger", doc: true}
	}
}
</script>

<style lang="scss" scoped>
.bar {
	/deep/ {
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
}
</style>
