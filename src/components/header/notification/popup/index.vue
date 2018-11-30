<template>
	<popup>
		<div class="notificaion-popup" ref="notificaion-popup">
			<vHeader v-bind="{loading}" @updateItems="updateItems"/>
			<items v-bind="{items}" @updateItem="updateItem"/>
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
			items: [],
			meta: null,
			loading: false
		}
	},
	methods: {
		async getItems({page} = {page: 1}) {
			if (this.loading) return;
			this.loading = true;

			try {
				const {data: {data, meta}} = await this.$axios.get("account/notifications", {params: {page}});
				this.items = [...this.items, ...data];
				this.meta = meta;
			} catch(err) {
				// error
			} finally {
				this.loading = false;
			}
		},

		updateItem({id, ...data}) {
			Object.assign(this.items.find(x => x.id === id), data);
		},

		updateItems(data) {
			this.items = this.items.map(x => ({...x, ...data}));
		},

		scroll({target}) {
			if (target.scrollTop + 200 >= (target.scrollHeight - target.offsetHeight)) {
				if (this.meta.current_page < this.meta.last_page) {
					this.getItems({page: this.meta.current_page + 1})
				}
			}
		}
	},
	created() {
		this.getItems();
	},
	mounted() {
		this.$refs["notificaion-popup"].addEventListener("scroll", this.scroll);
	},
	beforeDestroy() {
		this.$refs["notificaion-popup"].removeEventListener("scroll", this.scroll);
	}
};
</script>

<style lang="scss" scoped>
.notificaion-popup {
	font-size: 0.8em;
	width: 300px;
}
</style>
