<template>
	<div class="checkbox">
		<Checkbox v-model="data.value" @change="update" />
	</div>
</template>

<script>
import {Checkbox} from "element-ui";

export default {
	components: {Checkbox},
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
