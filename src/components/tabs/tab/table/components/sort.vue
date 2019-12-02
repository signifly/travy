<template>
	<div class="sort">
		<Select
			placeholder="Sort"
			:clearable="true"
			@change="select"
			:value="value"
		>
			<Option v-for="item in options" :key="item.value" v-bind="item" />
		</Select>
	</div>
</template>

<script>
import {Select, Option} from "element-ui";

export default {
	components: {Select, Option},
	props: {
		state: {type: Object, required: true},
		items: {type: Array, required: true}
	},
	computed: {
		value: (t) => t.state.query.sort,
		options() {
			return this.items.reduce(
				(sum, x) => [
					...sum,
					...(x.manual
						? [x]
						: [
								{label: `${x.label} (A-Z)`, value: x.value},
								{label: `${x.label} (Z-A)`, value: `-${x.value}`}
						  ])
				],
				[]
			);
		}
	},
	methods: {
		select(value) {
			this.state.set({
				page: undefined,
				sort: value || undefined
			});

			this.$emit("getData");
		}
	}
};
</script>

<style lang="scss" scoped>
.sort {
	max-width: 160px;
}
</style>
