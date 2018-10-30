<template>
	<div class="datepicker">
		<DatePicker
			:value="dateC"
			size="medium"
			align="center"
			:clearable="false"
			:picker-options="pickerOpts"
			format="yyyy-MM-dd"
			value-format="timestamp"
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
				date: "somedate"
			},
			data: {
				somedate: 1325376000
			}
		}
	},
	props: {
		date: {type: [Number, String], required: false, doc: true},
		_date: {type: String, required: false},
	},
	computed: {
		dateC: (t) => t.date ? t.date * 1000 : undefined
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
			date = date / 1000;

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
