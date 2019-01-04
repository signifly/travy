<template>
	<popup>
		<div class="notification-popup">
			<vHeader v-bind="{loading}" @updateItems="updateItems"/>
			<items v-if="items" v-bind="{items, meta}" @updateItem="updateItem" @getItems="getItems"/>
		</div>
	</popup>
</template>

<script>
import popup from "@/components/popup";
import vHeader from "./header";
import items from "./items";

export default {
	components: {popup, vHeader, items},
	data() {
		return {
			meta: null,
			items: null,
			loading: false
		}
	},
	methods: {
		async getItems({page} = {page: 1}) {
			if (this.loading) return;
			this.loading = true;

			try {
				const {data: {data, meta}} = await this.$axios.get("account/notifications", {params: {page, count: 20}});
				this.items = [...this.items || [], ...data];
				this.meta = meta;
			} catch(err) {
				// error
			} finally {
				this.loading = false;
			}
		},

		updateItem({id, ...data}) {
			Object.assign(this.items.find(x => x.id === id), data);
			this.$emit("getUnread");
		},

		updateItems(data) {
			this.items = this.items.map(x => ({...x, ...data}));
			this.$emit("getUnread");
		}
	},
	created() {
		this.getItems();
	}
};
</script>

<style lang="scss" scoped>
.notification-popup {
	overflow: hidden;
	border-radius: 6px;
	font-size: 0.8em;
	width: 300px;
	display: flex;
	flex-direction: column;
}
</style>
