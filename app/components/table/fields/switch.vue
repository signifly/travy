<template>
	<div class="switch">
		<elSwitch v-model="val" />
	</div>
</template>

<script>
import {Switch} from "element-ui";

export default {
	components: {elSwitch: Switch},
	props: {
		value: {type: Boolean, required: true}
	},
	data() {
		return {
			val: this.value
		}
	}
}
</script>
