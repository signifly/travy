<template>
	<div class="input">
		<Input v-model="data.value" @input="update" v-bind="{disabled}" :controls="false" size="medium" />
	</div>
</template>

<script>
import {Input} from "element-ui";

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
		value: {type: [String, Number], required: false, doc: true},
		_value: {type: String, required: true},
		disabled: {type: Boolean, required: false}
	},
	data() {
		return {
			data: {
				value: this.value
			}
		}
	},
	computed: {
		nodata: (t) => !t.data.value
	},
	methods: {
		update(value) {
			this.$emit("fieldA", {
				action: "update",
				data: {[this._value]: value}
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
}
</style>
