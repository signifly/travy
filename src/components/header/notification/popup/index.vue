<template>
	<popup>
		<div class="notification-popup" ref="popup" tabindex="0" @blur="close">
			<vHeader v-bind="{loading: !data}" @itemsRead="itemsRead" />
			<items
				v-bind="{data, meta}"
				@getItems="getItems"
				@itemRead="itemRead"
				v-if="data"
			/>
		</div>
	</popup>
</template>

<script>
import popup from "@/components/popup";
import vHeader from "./header";
import items from "./items";

export default {
	components: {popup, vHeader, items},
	props: {
		active: {type: Boolean, required: true},
		unread: {type: Number, required: true},
		user: {type: Object, required: true}
	},
	data: () => ({
		loading: false,
		data: null,
		meta: null
	}),
	methods: {
		close(e) {
			// close if not inside this element
			if (!this.$el.contains(e.relatedTarget)) {
				this.$emit("update:active", false);
			} else {
				this.$refs.popup.focus();
			}
		},

		itemRead(id) {
			this.$emit("update:unread", this.unread - 1);

			Object.assign(
				this.data.find((x) => x.id === id),
				{is_read: true}
			);
		},

		itemsRead() {
			this.$emit("update:unread", 0);
			this.data = this.data.map((x) => ({...x, is_read: true}));
		},

		async getItems({page} = {page: 1}) {
			if (this.loading) return;
			this.loading = true;

			try {
				const {data: res} = await this.$axios.get("account/notifications", {
					params: {page, count: 20}
				});

				const {data, meta} = res;

				this.data = page > 1 ? [...this.data, ...data] : data;
				this.meta = meta;
			} catch (err) {
				// error
			} finally {
				this.loading = false;
			}
		}
	},

	async created() {
		await this.getItems();
		this.$ws.on(`users.${this.user.id}`, this.getItems);
	},

	mounted() {
		setTimeout(() => {
			this.$refs.popup.focus();
		}, 50);
	},

	beforeDestroy() {
		this.$ws.stop(`users.${this.user.id}`, this.getItems);
	}
};
</script>

<style lang="scss" scoped>
.notification-popup {
	outline: none;
	overflow: hidden;
	border-radius: 6px;
	font-size: 0.8em;
	width: 300px;
	display: flex;
	flex-direction: column;
}
</style>
