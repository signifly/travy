<template>
	<div class="switch">
		<elSwitch :value="value" :disabled="_disabled" @change="update" />
	</div>
</template>

<script>
import {Switch} from "element-ui";

export default {
	components: {elSwitch: Switch},
	meta: {
		res: {
			props: {
				_disabled: false,
				value: "switchVal"
			},
			data: {
				switchVal: false
			}
		}
	},
	props: {
		_disabled: {type: Boolean, required: false},
		value: {type: Boolean, required: false}
	},
	methods: {
		update(value) {
			this.$emit("event", {
				actions: {
					update: {data: {value}}
				}
			});
		}
	}
};
</script>
