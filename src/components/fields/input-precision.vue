<template>
	<div class="input" @keypress="validate">
		<InputNumber
			:value="value"
			:disabled="_disabled"
			:precision="_precision"
			:step="_step"
			:max="_max"
			:controls="true"
			size="medium"
			@input="update"
		/>
	</div>
</template>

<script>
import {InputNumber} from "element-ui";
import {toNumber} from "lodash";

export default {
	components: {InputNumber},
	meta: {
		res: {
			props: {
				value: "inputVal",
				_disabled: false,
				_precision: 2,
				_step: 0.1,
				_max: 10
			},
			data: {
				inputVal: 3.2
			}
		}
	},
	props: {
		_disabled: {type: Boolean, required: false},
		_precision: {type: Number, required: true},
		value: {type: Number, required: false},
		_step: {type: Number, required: true},
		_max: {type: Number, required: true}
	},
	methods: {
		validate(e) {
			if (e.key === ".") return;
			if (isNaN(toNumber(e.key))) e.preventDefault();
		},
		update(value) {
			// prevent update emit on init
			if (value === this.value) return;

			this.$emit("event", {
				actions: {
					update: {data: {value}}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.input {
	position: relative;
	.el-input-number {
		width: 100%;
	}
}
</style>
