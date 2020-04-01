<template>
	<div class="progress" :class="status">
		<Tooltip
			transition="trans-fadeRight"
			:content="`${percentage}%`"
			placement="right"
		>
			<Progress
				class="bar"
				v-bind="{percentage, color, status}"
				:show-text="false"
			/>
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
				status: "warning",
				color: "purple",
				percentage: 60
			}
		}
	},
	props: {
		color: {type: String, required: false, note: "overrides status"},
		status: {type: String, default: "primary"},
		percentage: {type: Number, default: 0}
	}
};
</script>

<style lang="scss" scoped>
.progress {
	width: 100%;
}
</style>
