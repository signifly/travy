<template>
	<div class="checkbox">
		<Checkbox v-model="val" @change="update">{{title}}</Checkbox>
	</div>
</template>

<script>
import {Checkbox} from "element-ui";

export default {
	components: {Checkbox},
	props: {
		value: {type: Boolean, required: true},
		title: {type: String, required: true}
	},
	data() {
		return {
			val: this.value
		}
	},
	methods: {
		update(value) {
			this.$emit("update", {value});
		}
	}
}
</script>
