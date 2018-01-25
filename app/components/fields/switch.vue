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
		props: {type: Object, required: true},
		value: {type: Boolean, required: true}
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
			this.$emit("update", {
				data: {[this.props.value]: val}
			});
		}
	}
}
</script>
