<template>
	<div class="input">
		<Input v-model="valueC" @input="update" :disabled="_disabled" :controls="false" size="medium"/>
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
				value: "inputVal"
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
	.el-input {
		width: 100%;

		::v-deep {
			.el-input__inner {
				text-align: left;
			}
		}
	}
}
</style>
