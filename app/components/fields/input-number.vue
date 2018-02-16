<template>
	<div class="input">
		<InputNumber v-model="data.value" @change="update" v-bind="{disabled}" :controls="false" size="medium" />
		<div class="unit" v-if="unit">{{unit}}</div>
	</div>
</template>

<script>
import {InputNumber} from "element-ui";

export default {
	components: {InputNumber},
	meta: {
		res: {
			props: {
				value: "inputVal"
			},
			data: {
				inputVal: 3
			}
		}
	},
	props: {
		value: {type: Number, required: false},
		_value: {type: String, required: true},
		unit: {type: String, required: false},
		disabled: {type: Boolean, required: false}
	},
	data() {
		return {
			data: {
				value: this.value
			}
		}
	},
	methods: {
		update(val) {
			this.$emit("fieldA", {
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
