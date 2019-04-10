<template>
	<div class="checkbox">
		<Checkbox v-model="data.value" @change="update"/>
	</div>
</template>

<script>
import {Checkbox} from "element-ui";

export default {
	components: {Checkbox},
	meta: {
		res: {
			props: {
				value: "checkbox"
			},
			data: {
				checkbox: false
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
				actions: {
					update: {data: {[this._value]: val}}
				}
			});
		}
	}
}
</script>
