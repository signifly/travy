<template>
	<div class="input">
		<Input
			v-model="valueC"
			:disabled="_disabled"
			:type="_type"
			:controls="false"
			size="medium"
			@input="update"
		/>
		<div class="unit" v-if="_unit">{{_unit}}</div>
	</div>
</template>

<script>
import {Input} from "element-ui";
import {debounce} from "lodash";

export default {
	components: {Input},
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
		alt: {type: Object, required: true},
		_disabled: {type: Boolean, required: false, doc: true},
		value: {type: [String, Number], required: false, doc: true},
		_unit: {type: String, required: false, doc: true},
		_type: {type: String, default: "text", doc: true},
		_value: {type: String, required: true}
	},
	data() {
		return {
			valueC: this.value
		}
	},
	computed: {
		wait: (t) => t.alt.type === "table" ? 500 : 0
	},
	methods: {
		update(value) {
			this.$emit("event", {
				actions: {
					update: {data: {[this._value]: value}}
				}
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
