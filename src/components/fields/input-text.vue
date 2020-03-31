<template>
	<div class="input">
		<Input
			v-bind="{value, type, disabled}"
			:controls="false"
			@input="update"
			size="medium"
		/>
		<div class="unit" v-if="unit">{{ unit }}</div>
	</div>
</template>

<script>
import {Input} from "element-ui";

export default {
	components: {Input},
	meta: {
		spec: "props",
		res: {
			props: {
				value: "value",
				type: "text",
				unit: "cm"
			},
			data: {
				value: ""
			}
		}
	},
	props: {
		value: {type: [String, Number], required: false},
		disabled: {type: Boolean, required: false},
		unit: {type: String, required: false},
		type: {type: String, default: "text"}
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
