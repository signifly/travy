<template>
	<div class="textarea">
		<Input v-model="data.content" @input="update" v-bind="{disabled}" type="textarea" :rows="3" :controls="false" size="medium" />
	</div>
</template>

<script>
import {Input} from "element-ui";

export default {
	components: {Input},
	meta: {
		res: {
			props: {
				content: "text"
			},
			data: {
				text: ""
			}
		}
	},
	props: {
		content: {type: String, required: false, doc: true},
		_content: {type: String, required: true},
		disabled: {type: Boolean, required: false}
	},
	data() {
		return {
			data: {
				value: this.content
			}
		}
	},
	methods: {
		update(content) {
			this.$emit("fieldA", {
				action: "update",
				data: {[this._content]: content}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.textarea {

}
</style>
