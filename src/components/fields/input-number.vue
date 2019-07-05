<template>
	<div class="input" @keypress="validate">
		<Input
			v-model="data.value"
			@input="update"
			:disabled="_disabled"
			:controls="false"
			size="medium"
		/>
		<div class="unit" v-if="_unit">{{ _unit }}</div>
	</div>
</template>

<script>
import {Input} from "element-ui";
import {toNumber} from "lodash";

export default {
	components: {Input},
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
		_value: {type: String, required: true}
	},
	data() {
		return {
			data: {
				value: null
			}
		};
	},
	methods: {
		validate(e) {
			if (isNaN(toNumber(e.key))) e.preventDefault();
		},
		update(value) {
			value = parseInt(value) || 0;

			this.$emit("event", {
				actions: {
					update: {data: {[this._value]: value}}
				}
			});
		}
	},
	created() {
		this.$watch("value", (value) => (this.data.value = value), {
			immediate: true
		});
	}
};
</script>

<style lang="scss" scoped>
.input {
	position: relative;
	.el-input-number {
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
