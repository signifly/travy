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
				disabled: false,
				precision: 2,
				step: 0.1,
				max: 10
			},
			data: {
				inputVal: 3.2
			}
		}
	},
	props: {
		_disabled: {type: Boolean, required: false, doc: true},
		_precision: {type: Number, required: true, doc: true},
		_step: {type: Number, required: true, doc: true},
		_max: {type: Number, required: true, doc: true},
		value: {type: Number, required: false, doc: true},
		_value: {type: String, required: true}
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
					update: {data: {[this._value]: value}}
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
