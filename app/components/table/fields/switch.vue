<template>
	<div class="switch">
		<elSwitch v-model="val" @change="update" />
	</div>
</template>

<script>
import {Switch} from "element-ui";

export default {
	components: {elSwitch: Switch},
	props: {
		value: {type: Boolean, required: true},
		column: {type: Object, required: true}
	},
	data() {
		return {
			val: this.value
		}
	},
	computed: {
		key() {
			return this.column.props.value;
		}
	},
	methods: {
		update(val) {
			this.$emit("update", {[this.key]: val});
		}
	}
}
</script>
