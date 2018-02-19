<template>
	<div class="textarea">
		<Input v-model="data.text" @input="update" v-bind="{disabled}" type="textarea" :rows="3" :controls="false" size="medium" />
	</div>
</template>

<script>
import {Input} from "element-ui";

export default {
	components: {Input},
	meta: {
		res: {
			props: {
				text: "content"
			},
			data: {
				content: ""
			}
		}
	},
	props: {
		text: {type: String, required: false, doc: true},
		_text: {type: String, required: true},
		disabled: {type: Boolean, required: false}
	},
	data() {
		return {
			data: {
				text: this.text
			}
		}
	},
	methods: {
		update(text) {
			this.$emit("fieldA", {
				action: "update",
				data: {[this._text]: text}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.textarea {

}
</style>
