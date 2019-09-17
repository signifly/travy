<template>
	<div class="input">
		<Input
			type="password"
			v-bind="{value}"
			@input="update"
			:disabled="_disabled"
			:controls="false"
			size="medium"
		/>
	</div>
</template>

<script>
import {Input} from "element-ui";

export default {
	components: {Input},
	meta: {
		res: {
			props: {
				disabled: false,
				value: "password"
			},
			data: {
				password: ""
			}
		}
	},
	props: {
		_disabled: {type: Boolean, required: false, doc: true},
		value: {type: String, required: false, doc: true}
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
}
</style>
