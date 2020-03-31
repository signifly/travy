<template>
	<div class="dateRange">
		<DatePicker
			start-placeholder="Start Date"
			:picker-options="pickerOpts"
			:value-format="formatValue"
			end-placeholder="End Date"
			:clearable="clearable"
			:disabled="disabled"
			:editable="false"
			:format="format"
			@input="update"
			:value="dates"
			align="center"
			size="medium"
			:type="type"
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
				dateStart: "{date1}",
				dateEnd: "{date2}",
				type: "daterange",
				clearable: true
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
		formatValue: {type: String, default: "timestamp"},
		format: {type: String, default: "dd-MM-yyyy"},
		clearable: {type: Boolean, required: false},
		disabled: {type: Boolean, required: false},
		type: {
			type: String,
			required: false,
			default: "daterange",
			note: `daterange, datetimerange`
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
		timestamp: (t) => t.formatValue === "timestamp",

		dates: (t) =>
			[t.dateStart, t.dateEnd]
				.filter((x) => x)
				.map((date) => {
					return t.timestamp && date ? date * 1000 : date;
				})
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
