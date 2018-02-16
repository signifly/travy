<template>
	<div class="dateRange">
		<DatePicker
			v-model="data.dates"
			size="small"
			align="center"
			type="daterange"
			:clearable="false"
			:picker-options="pickerOpts"
			start-placeholder="Start Date"
			end-placeholder="End Date"
			format="yyyy-MM-dd"
			value-format="timestamp"
			@change="update"
		/>
	</div>
</template>

<script>
import {DatePicker} from "element-ui";

export default {
	components: {DatePicker},
	meta: {
		res: {
			props: {
				dates: "dateRange"
			},
			data: {
				dateRange: [1325376000, 1356998400]
			}
		}
	},
	props: {
		dates: {type: Array, required: false},
		_dates: {type: String, required: true}
	},
	data() {
		return {
			pickerOpts: {
				firstDayOfWeek: 1
			},
			data: {
				dates: this.dates.map(x => x * 1000)
			}
		}
	},
	methods: {
		update(dates) {
			dates = dates.map(x => x / 1000);

			this.$emit("fieldA", {
				action: "update",
				data: {[this._dates]: dates}
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
