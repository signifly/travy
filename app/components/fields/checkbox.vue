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
		props: {type: Object, required: true},
		value: {type: Boolean, required: false}
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
				data: {[this.props.value]: val}
			});
		}
	}
}
</script>
