<template>
	<div class="input">
		<InputNumber v-model="data.value" @change="update" :disabled="_disabled" :controls="false" size="medium" />
		<div class="unit" v-if="_unit">{{_unit}}</div>
	</div>
</template>

<script>
import {isNumber} from "lodash";
import {InputNumber} from "element-ui";

export default {
	components: {InputNumber},
	meta: {
		res: {
			props: {
				disabled: false,
				value: "inputVal",
				unit: "cm"
			},
			data: {
				inputVal: 3
			}
		}
	},
	props: {
		_disabled: {type: Boolean, required: false, doc: true},
		_unit: {type: String, required: false, doc: true},
		value: {type: Number, required: false, doc: true},
		_value: {type: String, required: true},
	},
	data() {
		return {
			data: {
				value: this.value
			}
		}
	},
	computed: {
		nodata: (t) => !isNumber(t.data.value)
	},
	methods: {
		update(val) {
			this.$emit("fieldA", {
				wait: 500,
				action: "update",
				data: {[this._value]: val}
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

		/deep/ {
			.el-input__inner {
				text-align: left;
			}
		}
	}
	.unit {
		pointer-events: none;
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		font-size: em(12);
		color: $blue3;
		margin-right: 1em;
	}
}
</style>
