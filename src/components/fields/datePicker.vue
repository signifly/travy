<template>
	<div class="datepicker">
		<DatePicker
			:value="dateC"
			size="medium"
			align="center"
			:clearable="false"
			:picker-options="pickerOpts"
			:format="_format"
			:value-format="_formatValue"
			@input="update"
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
				date: "somedate",
				format: "dd-MM-yyyy",
				formatValue: "timestamp"
			},
			data: {
				somedate: 1325376000
			}
		}
	},
	props: {
		date: {type: [Number, String], required: false, doc: true},
		_date: {type: String, required: false},
		_format: {type: String, default: "dd-MM-yyyy"},
		_formatValue: {type: String, default: "timestamp"}
	},
	computed: {
		timestamp: (t) => t.formatValue === "timestamp",
		dateC: (t) => t.timestamp && t.date ? t.date * 1000 : t.date
	},
	data() {
		return {
			pickerOpts: {
				firstDayOfWeek: 1
			}
		}
	},
	methods: {
		update(date) {
			date = this.timestamp ? date / 1000 : date;

			this.$emit("fieldA", {
				action: "update",
				data: {
					[this._date]: date
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.datepicker {
	.el-date-editor {
		width: 100%;
	}
}
</style>
