<template>
	<div class="colorpicker">
		<ColorPicker color-format="hex" v-model="data.value" @change="update" />
	</div>
</template>

<script>
import {ColorPicker} from "element-ui";

export default {
	components: {ColorPicker},
	meta: {
		res: {
			props: {
				value: "color"
			},
			data: {
				color: "#000"
			}
		}
	},
	props: {
		value: {type: String, required: false, doc: true},
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
