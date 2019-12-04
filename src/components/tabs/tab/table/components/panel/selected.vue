<template>
	<div class="selected">
		<itemListTooltip :items="itemsC">
			<Checkbox v-bind="{value}" @input="unselect">
				{{ selected.items.length }} selected
			</Checkbox>
		</itemListTooltip>
	</div>
</template>

<script>
import itemListTooltip from "@/components/fields/item-list-tooltip";
import {rStringProps} from "@/modules/utils";
import {Checkbox} from "element-ui";

export default {
	components: {Checkbox, itemListTooltip},
	props: {
		selected: {type: Object, required: true},
		selectedOptions: {type: Object, required: true}
	},
	computed: {
		value: (t) => t.selected.items.length > 0,
		itemsC() {
			return this.selected.items.map((x) => {
				return rStringProps({
					data: x,
					val: {
						label: this.selectedOptions.label,
						_link: this.selectedOptions.link
					}
				});
			});
		}
	},
	methods: {
		unselect() {
			this.selected.items = [];
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
