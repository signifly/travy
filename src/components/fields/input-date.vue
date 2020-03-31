<template>
	<div class="datepicker">
		<DatePicker
			:picker-options="pickerOpts"
			:value-format="formatValue"
			:clearable="clearable"
			:disabled="disabled"
			:editable="false"
			:format="format"
			@input="update"
			:value="dateC"
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
				formatValue: "timestamp",
				date: "{somedate}",
				clearable: true,
				type: "month"
			},
			data: {
				somedate: 1325376000
			}
		}
	},
	props: {
		type: {type: String, default: "date", note: "year, month, date, datetime"},
		formatValue: {type: String, default: "timestamp"},
		date: {type: [Number, String], required: false},
		format: {type: String, default: "dd-MM-yyyy"},
		clearable: {type: Boolean, required: false},
		disabled: {type: Boolean, required: false}
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
