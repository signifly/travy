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
		res: {
			props: {
				_disabled: false,
				value: "content"
			},
			data: {
				content: ""
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
.textarea {
}
</style>
