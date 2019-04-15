<template>
	<div class="textarea">
		<Input
			v-model="data.text"
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
				disabled: false,
				text: "content"
			},
			data: {
				content: ""
			}
		}
	},
	props: {
		_disabled: {type: Boolean, required: false, doc: true},
		text: {type: String, required: false, doc: true},
		_text: {type: String, required: true}
	},
	data() {
		return {
			data: {
				text: this.text
			}
		};
	},
	methods: {
		update(text) {
			this.$emit("event", {
				actions: {
					update: {data: {[this._text]: text}}
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
