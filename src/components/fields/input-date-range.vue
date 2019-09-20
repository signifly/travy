<template>
	<div class="dateRange">
		<DatePicker
			:value="dates"
			size="medium"
			align="center"
			:type="_type"
			:format="format"
			:editable="false"
			:clearable="_clearable"
			:disabled="_disabled"
			:picker-options="pickerOpts"
			:value-format="_formatValue"
			start-placeholder="Start Date"
			end-placeholder="End Date"
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
				_type: "daterange",
				dateStart: "date1",
				dateEnd: "date2",
				_clearable: true
			},
			data: {
				date1: 1543878000,
				date2: 1545346800
			}
		}
	},
	props: {
		dateStart: {type: [Number, String], required: false},
		dateEnd: {type: [Number, String], required: false},
		_formatValue: {type: String, default: "timestamp"},
		_clearable: {type: Boolean, default: false},
		_disabled: {type: Boolean, default: false},
		_format: {type: String, required: false},
		_type: {
			type: String,
			required: false,
			default: "daterange",
			note: `daterange/datetimerange`
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
		timestamp: (t) => t._formatValue === "timestamp",

		dates: (t) =>
			[t.dateStart, t.dateEnd]
				.filter((x) => x)
				.map((date) => {
					return t.timestamp && date ? date * 1000 : date;
				}),

		format: (t) =>
			t._format ||
			{
				daterange: "dd-MM-yyyy",
				datetimerange: "yyyy-MM-dd HH:mm:ss"
			}[t._type]
	},
	methods: {
		update(dates) {
			dates = (dates || []).map((x) => (this.timestamp ? x / 1000 : x));

			if (dates.length === 0) {
				dates = [null, null];
			}

			this.$emit("event", {
				actions: {
					update: {
						data: {
							dateStart: dates[0],
							dateEnd: dates[1]
						}
					}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.dateRange {
	.el-date-editor {
		width: 100%;
	}
}
</style>
