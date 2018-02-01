<template>
	<div class="dateRange">
		<DatePicker
			v-model="data.dates"
			size="small"
			align="right"
			type="daterange"
			:clearable="false"
			:picker-options="pickerOpts"
			start-placeholder="Start Date"
			end-placeholder="End Date"
			@change="update"
		/>
	</div>
</template>

<script>
import {DatePicker} from "element-ui";

export default {
	components: {DatePicker},
	props: {
		props: {type: Object, required: true},
		dates: {type: Array, required: true}
	},
	data() {
		return {
			pickerOpts: {
				firstDayOfWeek: 1
			},
			data: {
				dates: this.dates
			}
		}
	},
	methods: {
		update(dates) {
			this.$emit("fieldA", {
				action: "update",
				data: {[this.props.dates]: dates}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.dateRange {
	.el-date-editor {
		width: auto;
	}
}
</style>
