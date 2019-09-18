<template>
	<div class="input">
		<Input
			v-bind="{value}"
			@input="update"
			:disabled="_disabled"
			:type="_type"
			:controls="false"
			size="medium"
		/>
		<div class="unit" v-if="_unit">{{ _unit }}</div>
	</div>
</template>

<script>
import {Input} from "element-ui";

export default {
	components: {Input},
	meta: {
		res: {
			props: {
				value: "inputVal",
				type: "text",
				unit: "cm"
			},
			data: {
				inputVal: ""
			}
		}
	},
	props: {
		value: {type: [String, Number], required: false},
		_disabled: {type: Boolean, required: false},
		_unit: {type: String, required: false},
		_type: {type: String, default: "text"}
	},
	methods: {
		update(value) {
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
	.el-input {
		width: 100%;

		::v-deep {
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
