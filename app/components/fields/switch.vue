<template>
	<div class="switch">
		<elSwitch v-model="data.value" :disabled="_disabled" @change="update" />
	</div>
</template>

<script>
import {Switch} from "element-ui";

export default {
	components: {elSwitch: Switch},
	meta: {
		res: {
			props: {
				disabled: false,
				value: "switchVal",
			},
			data: {
				switchVal: false
			}
		}
	},
	props: {
		_disabled: {type: Boolean, required: false, doc: true},
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
