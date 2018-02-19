<template>
	<div class="switch">
		<elSwitch v-model="data.value" @change="update" />
	</div>
</template>

<script>
import {Switch} from "element-ui";

export default {
	components: {elSwitch: Switch},
	meta: {
		res: {
			props: {
				value: "switchVal"
			},
			data: {
				switchVal: false
			}
		}
	},
	props: {
		value: {type: Boolean, required: false, doc: true},
		_value: {type: String, required: true}
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
				data: {[this._value]: val}
			});
		}
	}
}
</script>
