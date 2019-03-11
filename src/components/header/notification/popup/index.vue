<template>
	<popup>
		<div class="notification-popup">
			<vHeader v-bind="{loading}" @updateItems="updateItems"/>
			<items v-if="items" v-bind="{items, meta}" @updateItem="updateItem"/>
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
		loading: {type: Boolean, required: true},
		items: {type: Array, required: true},
		meta: {type: Object, required: true}
	},
	methods: {
		updateItem(obj) {
			this.$emit("updateItem", obj);
		},

		updateItems(data) {
			this.$emit("updateItems", data);
		}
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
