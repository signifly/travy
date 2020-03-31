<template>
	<Button size="medium" @click="start">Sequential edit</Button>
</template>

<script>
import {transProps} from "@/modules/utils";
import {Button} from "element-ui";

export default {
	components: {Button},
	props: {
		url: {type: String, required: true},
		selected: {type: Object, required: true}
	},
	computed: {
		items() {
			return this.selected.items.map((data) =>
				transProps({val: this.url, data})
			);
		}
	},
	methods: {
		start() {
			localStorage.setItem(
				"seq",
				JSON.stringify({
					route: this.$route.fullPath,
					items: this.items
				})
			);

			this.$router.push({
				path: this.items[0],
				query: {modifiers: this.$route.query.modifiers, seq: true}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.item {
	user-select: none;
}
</style>
