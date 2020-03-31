<template>
	<div class="toggle">
		<elSwitch v-bind="{value, disabled}" @change="update" />
	</div>
</template>

<script>
import {Switch} from "element-ui";

export default {
	components: {elSwitch: Switch},
	meta: {
		spec: "props",
		res: {
			props: {
				disabled: false,
				value: "{value}"
			},
			data: {
				value: false
			}
		}
	},
	props: {
		disabled: {type: Boolean, required: false},
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
