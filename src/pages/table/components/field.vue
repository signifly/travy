<template>
	<component :is="link ? 'router-link' : 'div'" class="table-field" :to="link">
		<field v-bind="column" :alt="{data, type: 'table'}" @event="event" />
	</component>
</template>

<script>
import {rStringProps, mergeData, mapPaths} from "@/modules/utils";
import field from "@/components/field";
import state from "../state";

export default {
	components: {field},
	props: {
		column: {type: Object, required: true},
		scope: {type: Object, required: true}
	},
	computed: {
		query: () => state.query,
		data: (t) => t.scope.row,
		onClick: (t) => t.column.onClick,
		link() {
			const url = rStringProps({data: this.data, val: this.onClick});
			return url
				? {path: url, query: {modifiers: this.query.modifiers}}
				: false;
		}
	},
	methods: {
		event({actions, done}) {
			const {update} = actions;

			// because of element-ui we have to update table item data here
			if (update) {
				update.data = mapPaths(update.data);
				Object.assign(this.data, mergeData(this.data, update.data));
			}

			this.$emit("event", {
				done,
				actions: {
					...actions,
					update: update && {item: this.data, data: update.data}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.table-field {
	text-decoration: none;
	color: $black1;
	width: 100%;

	.field {
		margin: 0;
	}
}
</style>
