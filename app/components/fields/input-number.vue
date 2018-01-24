<template>
	<div class="input">
		<Input v-model.number="val" @input="update" />
	</div>
</template>

<script>
import {Input} from "element-ui";

export default {
	components: {Input},
	props: {
		props: {type: Object, required: true},
		value: {type: Number, required: true}
	},
	data() {
		return {
			val: this.value
		}
	},
	methods: {
		update(val) {
			this.$emit("update", {
				data: {[this.props.value]: this.val}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.input {

}
</style>
