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
		res: {
			props: {
				type: "month",
				clearable: true,
				date: "somedate",
				formatValue: "timestamp"
			},
			data: {
				somedate: 1325376000
			}
		}
	},
	props: {
		date: {type: [Number, String], required: false, doc: true},
		_date: {type: String, required: false},
		_format: {type: String, required: false, doc: true},
		_formatValue: {type: String, default: "timestamp", doc: true},
		_clearable: {type: Boolean, default: false, doc: true},
		_disabled: {type: Boolean, default: false, doc: true},
		_type: {
			type: String,
			required: false,
			default: "date",
			doc: true,
			note: "year, month, date, datetime"
		}
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
					update: {data: {[this._date]: date}}
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
