<template>
	<div class="dateRange">
		<DatePicker
			:value="dates"
			size="medium"
			align="center"
			:type="_type"
			:format="format"
			:editable="false"
			:clearable="false"
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
				type: "daterange",
				dateStart: "dateStart",
				dateEnd: "dateEnd"
			},
			data: {
				dateStart: 1543878000,
				dateEnd: 1545346800
			}
		}
	},
	props: {
		dateStart: {type: [Number, String], required: false, doc: true},
		dateEnd: {type: [Number, String], required: false, doc: true},
		_dateStart: {type: String, required: true},
		_dateEnd: {type: String, required: true},
		_format: {type: String, required: false, doc: true},
		_formatValue: {type: String, default: "timestamp", doc: true},
		_type: {type: String, required: false, default: "daterange", doc: true, note: `
			<i>daterange/datetimerange</i>
		`}
	},
	data() {
		return {
			pickerOpts: {
				firstDayOfWeek: 1
			}
		}
	},
	computed: {
		timestamp: (t) => t._formatValue === "timestamp",

		dates: (t) => [t.dateStart, t.dateEnd].filter(x => x).map(date => {
			return (t.timestamp && date) ? date * 1000 : date;
		}),

		format: (t) => t._format || {
			daterange: "dd-MM-yyyy",
			datetimerange: "yyyy-MM-dd HH:mm:ss"
		}[t._type]
	},
	methods: {
		update(dates) {
			dates = dates.map(x => this.timestamp ? x / 1000 : x);

			this.$emit("fieldA", {
				actions: {
					update: {data: {
						[this._dateStart]: dates[0],
						[this._dateEnd]: dates[1]
					}}
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
