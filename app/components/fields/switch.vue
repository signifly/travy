<template>
	<div class="switch">
		<elSwitch v-model="data.value" @change="update" />
	</div>
</template>

<script>
import {Switch} from "element-ui";

export default {
	components: {elSwitch: Switch},
	props: {
		value: {type: Boolean, required: false},
		xValue: {type: String, required: true}
	},
	data() {
		return {
			data: {
				value: this.value
			}
		}
	},
	methods: {
		update(val) {
			this.$emit("fieldA", {
				action: "update",
				data: {[this.xValue]: val}
			});
		}
	}
}
</script>
