<template>
	<div class="top">
		<modifiers
			v-if="modifiers"
			v-bind="[modifiers, {query}]"
			@update="updateModifiers"
		/>
	</div>
</template>

<script>
import modifiers from "@/components/hero/modifiers";
import state from "../state";

export default {
	components: {modifiers},
	props: {
		modifiers: {type: Object, required: false},
		loading: {type: Boolean, required: true}
	},
	computed: {
		query: () => state.query
	},
	methods: {
		updateModifiers({modifiers}) {
			state.mergeQuery({
				type: "replace",
				query: {modifiers}
			});

			this.$emit("reset");
		}
	}
};
</script>

<style lang="scss" scoped>
.top {
	justify-content: space-between;
	padding: 0.5em 1.5em;
	align-items: center;
	display: flex;
}
</style>
