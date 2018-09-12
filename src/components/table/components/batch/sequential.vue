<template>
	<Button size="medium" @click="start">Sequential edit</Button>
</template>

<script>
import {Button} from "element-ui";
import {endpointUrl} from "@/modules/utils";

export default {
	components: {Button},
	props: {
		ids: {type: Array, required: true},
		url: {type: String, required: true},
		selectedItems: {type: Array, required: true}
	},
	computed: {
		query: (t) => t.$route.query,
		tableId: (t) => t.$route.params.tableId,
		firstUrl: (t) => endpointUrl({url: t.url, data: t.selectedItems[0]})
	},
	methods: {
		start() {
			localStorage.setItem("sequential", JSON.stringify({[this.tableId]: {items: this.ids}}));
			this.$router.push({path: this.firstUrl, query: {modifiers: this.query.modifiers, sequential: true}});
		}
	}
};
</script>

<style lang="scss" scoped>
.item {
	user-select: none;
}
</style>
