<template>
	<div class="datepicker">
		<DatePicker
			:value="dateC"
			size="medium"
			align="center"
			:type="_type"
			:editable="false"
			:clearable="_clearable"
			:disabled="_disabled"
			:picker-options="pickerOpts"
			:format="format"
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
		spec: "props",
		res: {
			props: {
				_type: "month",
				date: "somedate",
				_clearable: true,
				_formatValue: "timestamp"
			},
			data: {
				somedate: 1325376000
			}
		}
	},
	props: {
		_type: {type: String, required: false, note: "year, month, date, datetime"},
		_formatValue: {type: String, default: "timestamp"},
		date: {type: [Number, String], required: false},
		_clearable: {type: Boolean, default: false},
		_disabled: {type: Boolean, default: false},
		_format: {type: String, required: false}
	},
	data() {
		return {
			pickerOpts: {
				firstDayOfWeek: 1
			}
		};
	},
	computed: {
		format: (t) =>
			t._format ||
			{
				year: "yyyy",
				month: "MM-yyyy",
				date: "dd-MM-yyyy",
				datetime: "yyyy-MM-dd HH:mm:ss"
			}[t._type],

		timestamp: (t) => t._formatValue === "timestamp",
		dateC: (t) => (t.timestamp && t.date ? t.date * 1000 : t.date)
	},
	methods: {
		update(date) {
			date = (this.timestamp ? date / 1000 : date) || null;

			this.$emit("event", {
				actions: {
					update: {data: {date}}
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
