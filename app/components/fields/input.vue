<template>
	<div class="input">
		<Input v-model="data.value" @input="update" v-bind="{disabled}" :controls="false" size="medium" />
		<div class="unit" v-if="unit">{{unit}}</div>
	</div>
</template>

<script>
import {Input} from "element-ui";

export default {
	components: {Input},
	props: {
		props: {type: Object, required: true},
		value: {type: String, required: false},
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
				data: {[this.props.value]: val}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.input {
	position: relative;
	.el-input {
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
