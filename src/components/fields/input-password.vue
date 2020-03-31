<template>
	<div class="input">
		<Input
			v-bind="{value, disabled, autocomplete}"
			:controls="false"
			type="password"
			@input="update"
			size="medium"
		/>
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
				disabled: false,
				value: "{password}"
			},
			data: {
				password: ""
			}
		}
	},
	props: {
		autocomplete: {type: String, required: false},
		disabled: {type: Boolean, required: false},
		value: {type: String, required: false}
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
