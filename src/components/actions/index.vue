<template>
	<div v-if="!disabled">
		<slot/>
	</div>
</template>

<script>
import {get, eq, gt, gte, lt, lte} from "lodash";

export default {
	props: {
		alt: {type: Object, default: () => ({})},
		data: {type: Object, required: false},
		hide: {type: Object, required: false} // {key, operator, value}
	},
	computed: {
		dataComb: (t) => ({...t.alt.data, ...t.data}),

		disabled() {
			if (!this.hide) return false;

			const op = ({eq, gt, gte, lt, lte})[this.hide.operator];
			const key = get(this.dataComb, this.hide.key);
			const value = this.hide.value;
			return op(key, value);
		}
	}
};
</script>
