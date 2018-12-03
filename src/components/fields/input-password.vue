<template>
	<div class="input">
		<Input type="password" v-model="data.value" @input="update" :disabled="_disabled" :controls="false" size="medium" />
	</div>
</template>

<script>
import {Input} from "element-ui";

export default {
	components: {Input},
	meta: {
		res: {
			props: {
				disabled: false,
				value: "passord"
			},
			data: {
				password: ""
			}
		}
	},
	props: {
		_disabled: {type: Boolean, required: false, doc: true},
		value: {type: String, required: false, doc: true},
		_value: {type: String, required: true},
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
				data: {[this._value]: val}
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
