<template>
	<div class="selected">
		<vItemsTooltip
			:items="selectedItems"
			:_itemKey="itemKey"
			:_itemLink="itemLink"
		>
			<Checkbox v-model="checked" @change="unselect">
				{{ selectedItems.length }} selected
			</Checkbox>
		</vItemsTooltip>
	</div>
</template>

<script>
import {Checkbox} from "element-ui";
import vItemsTooltip from "@/components/fields/items-tooltip.vue";

export default {
	components: {Checkbox, vItemsTooltip},
	props: {
		selectedItems: {type: Array, required: true},
		selectedOptions: {type: Object, required: true}
	},
	data() {
		return {
			checked: true
		};
	},
	computed: {
		itemKey: (t) => t.selectedOptions.label,
		itemLink: (t) => t.selectedOptions.link
	},
	methods: {
		unselect() {
			this.$emit("unselect");
		}
	}
};
</script>

<style lang="scss" scoped>
.selected {
	.el-checkbox {
		font-weight: 400;
	}
}
</style>
