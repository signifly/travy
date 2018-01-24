<template>
	<div class="input">
		<InputNumber v-model="val" @change="update" v-bind="{disabled}" :controls="false" size="medium" />
		<div class="unit" v-if="unit">{{unit}}</div>
	</div>
</template>

<script>
import {InputNumber} from "element-ui";

export default {
	components: {InputNumber},
	props: {
		props: {type: Object, required: true},
		value: {type: Number, required: true},
		unit: {type: String, required: false},
		disabled: {type: Boolean, required: false}
	},
	data() {
		return {
			val: this.value
		}
	},
	methods: {
		update(val) {
			console.log(val);
			this.$emit("update", {
				data: {[this.props.value]: this.val}
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
