<template>
	<popup>
		<div class="list">
			<item v-for="item in items" v-bind="item" :key="item.id"/>
		</div>
	</popup>
</template>

<script>
import popup from "@/components/popup";
import item from "./item";

export default {
	components: {popup, item},
	data() {
		return {
			items: [],
			meta: null
		}
	},
	methods: {
		async getItems() {
			const {data: {data, meta}} = await this.$axios.get("account/notifications");
			this.items = data;
			this.meta = meta;
		}
	},
	created() {
		this.getItems();
	}
};
</script>

<style lang="scss" scoped>
.list {
	width: 200px;
	overflow: auto;
	max-height: calc(100vh - 15em;)
}
</style>
