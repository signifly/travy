<template>
	<div class="textarea">
		<Input
			v-bind="{value, disabled}"
			:controls="false"
			@input="update"
			type="textarea"
			size="medium"
			:rows="3"
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
				value: "{value}",
				disabled: false
			},
			data: {
				value: ""
			}
		}
	},
	props: {
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
.textarea {
}
</style>
