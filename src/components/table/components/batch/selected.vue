<template>
	<div class="selected">
		<listTooltip
			:items="selectedItems"
			:_itemKey="itemKey"
			:_itemLink="itemLink"
		>
			<Checkbox v-model="checked" @change="unselect">
				{{ selectedItems.length }} selected
			</Checkbox>
		</listTooltip>
	</div>
</template>

<script>
import {Checkbox} from "element-ui";
import listTooltip from "@/components/fields/list-tooltip.vue";

export default {
	components: {Checkbox, listTooltip},
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
