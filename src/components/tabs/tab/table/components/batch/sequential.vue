<template>
	<Button size="medium" @click="start">Sequential edit</Button>
</template>

<script>
import {rStringProps} from "@/modules/utils";
import {Button} from "element-ui";

export default {
	components: {Button},
	props: {
		url: {type: String, required: true},
		selected: {type: Object, required: true}
	},
	computed: {
		query: (t) => t.$route.query,
		indexId: (t) => t.$route.params.indexId,
		firstUrl: (t) => rStringProps({val: t.url, data: t.selected.items[0]})
	},
	methods: {
		setSequential() {
			localStorage.setItem(
				"sequential",
				JSON.stringify({
					items: this.selected.items,
					firstUrl: this.firstUrl,
					indexId: this.indexId,
					url: this.url
				})
			);
		},

		start() {
			this.setSequential();
			this.$router.push({
				path: this.firstUrl,
				query: {modifiers: this.query.modifiers, sequential: true}
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
