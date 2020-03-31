<template>
	<div class="checkbox">
		<Checkbox v-bind="{value}" @change="update" />
	</div>
</template>

<script>
import {Checkbox} from "element-ui";

export default {
	components: {Checkbox},
	meta: {
		spec: "props",
		res: {
			props: {
				value: "{checkbox}"
			},
			data: {
				checkbox: false
			}
		}
	},
	props: {
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
