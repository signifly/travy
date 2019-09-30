<template>
	<div class="textarea">
		<Input
			:value="value"
			@input="update"
			:disabled="_disabled"
			type="textarea"
			:rows="3"
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
		spec: "props",
		res: {
			props: {
				_disabled: false,
				value: "value"
			},
			data: {
				value: ""
			}
		}
	},
	props: {
		_disabled: {type: Boolean, required: false},
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
.textarea {
}
</style>
