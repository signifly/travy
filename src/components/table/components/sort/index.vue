<template>
	<div class="sort">
		<Select :value="value" @change="select" placeholder="Sort">
			<Option v-for="item in options" :key="item.value" v-bind="item" />
		</Select>
	</div>
</template>

<script>
import {Select, Option} from "element-ui";
import state from "../../state";

export default {
	components: {Select, Option},
	props: {
		items: {type: Array, required: true},
		default: {type: String, required: false}
	},
	data: () => ({
		state
	}),
	computed: {
		value: (t) => t.state.query.sort,
		options() {
			return this.items.reduce(
				(sum, x) => [
					...sum,
					{label: `${x.label} (A-Z)`, value: x.value},
					{label: `${x.label} (Z-A)`, value: `-${x.value}`}
				],
				[]
			);
		}
	},
	methods: {
		select(value) {
			this.state.mergeQuery({
				type: "replace",
				query: {
					sort: value,
					page: undefined
				}
			});

			this.$emit("getData");
		}
	}
};
</script>

<style lang="scss" scoped>
.sort {
	margin-left: auto;
}
</style>
