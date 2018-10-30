<template>
	<div class="input" @keypress="validate">
		<Input v-model="valueC" @input="update" :disabled="_disabled" :controls="false" size="medium"/>
		<div class="unit" v-if="_unit">{{_unit}}</div>
	</div>
</template>

<script>
import {isNumber, toNumber, debounce} from "lodash";
import {Input} from "element-ui";

export default {
	components: {Input},
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
		alt: {type: Object, required: true},
		_disabled: {type: Boolean, required: false, doc: true},
		_unit: {type: String, required: false, doc: true},
		value: {type: Number, required: false, doc: true},
		_value: {type: String, required: true},
	},
	data() {
		return {
			valueC: this.value
		}
	},
	computed: {
		wait: (t) => t.alt.type === "table" ? 500 : 0,
		nodata: (t) => !isNumber(t.value)
	},
	methods: {
		validate(e) {
			if (isNaN(toNumber(e.key))) e.preventDefault();
		},
		update(value) {
			value = parseInt(value) || 0;

			this.$emit("fieldA", {
				action: "update",
				data: {[this._value]: value}
			});
		}
	},
	created() {
		this.update = debounce(this.update, this.wait);
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
