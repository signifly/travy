<template>
	<div class="selected">
		<listTooltip :items="itemsC">
			<Checkbox v-bind="{value}" @input="select">
				{{ selected.items.length }} selected
			</Checkbox>
		</listTooltip>
	</div>
</template>

<script>
import listTooltip from "@/components/fields/list-tooltip.vue";
import {rStringProps} from "@/modules/utils";
import {Checkbox} from "element-ui";

export default {
	components: {Checkbox, listTooltip},
	props: {
		selected: {type: Object, required: true},
		selectedOptions: {type: Object, required: true}
	},
	computed: {
		value: (t) => t.selected.items.length > 0,
		itemsC() {
			return this.selected.items.map((x) => {
				return rStringProps({
					val: this.selectedOptions,
					data: x
				});
			});
		}
	},
	methods: {
		select() {
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
