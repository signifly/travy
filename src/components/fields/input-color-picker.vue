<template>
	<div class="colorpicker">
		<ColorPicker color-format="hex" v-bind="{value}" @change="update" />
	</div>
</template>

<script>
import {ColorPicker} from "element-ui";

export default {
	components: {ColorPicker},
	meta: {
		spec: "props",
		res: {
			props: {
				value: "{color}"
			},
			data: {
				color: "#000"
			}
		}
	},
	props: {
		value: {type: String, required: false}
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
