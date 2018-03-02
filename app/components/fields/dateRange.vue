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
				dateStart: "dateStart",
				dateEnd: "dateEnd"
			},
			data: {
				// dateStart: 1325376000,
				// dateEnd: 1356998400
			}
		}
	},
	props: {
		dateStart: {type: Number, required: false, doc: true},
		dateEnd: {type: Number, required: false, doc: true},
		_dateStart: {type: String, required: true},
		_dateEnd: {type: String, required: true}
	},
	data() {
		return {
			pickerOpts: {
				firstDayOfWeek: 1
			},
			data: {
				dates: [this.dateStart, this.dateEnd].map(x => x * 1000).filter(x => x)
			}
		}
	},
	methods: {
		update(dates) {
			dates = dates.map(x => x / 1000);

			this.$emit("fieldA", {
				action: "update",
				data: {
					[this._dateStart]: dates[0],
					[this._dateEnd]: dates[1]
				}
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
