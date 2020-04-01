<template>
	<Tooltip v-if="Tooltip" :content="Tooltip" placement="bottom-start">
		<slot />
	</Tooltip>
	<div v-else><slot /></div>
</template>

<script>
import {operator} from "@/modules/utils";
import {Tooltip} from "element-ui";

export default {
	components: {Tooltip},
	props: {
		tooltip: {type: Array, default: () => []},
		data: {type: Object, required: false}
	},
	computed: {
		Tooltip() {
			return this.tooltip
				.map((item) => operator({...item.show, data: this.data}) && item.text)
				.filter((x) => x)[0];
		}
	}
};
</script>
