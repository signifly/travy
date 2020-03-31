<template>
	<div class="input" @keypress="validate">
		<InputNumber
			v-bind="{precision, value, disabled, step, max}"
			:controls="true"
			@input="update"
			size="medium"
		/>
	</div>
</template>

<script>
import {InputNumber} from "element-ui";
import {toNumber} from "lodash";

export default {
	components: {InputNumber},
	meta: {
		spec: "props",
		res: {
			props: {
				value: "{inputVal}",
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
		disabled: {type: Boolean, required: false},
		precision: {type: Number, required: true},
		value: {type: Number, required: false},
		step: {type: Number, required: true},
		max: {type: Number, required: true}
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
