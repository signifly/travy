<template>
	<div class="switch">
		<elSwitch v-model="val" :active-text="title" @change="update" />
	</div>
</template>

<script>
import {Switch} from "element-ui";

export default {
	components: {elSwitch: Switch},
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
