<template>
	<component :is="link ? 'router-link' : 'div'" class="table-field" :to="link">
		<field v-bind="column" :alt="{data, type: 'table'}" @event="event" />
	</component>
</template>

<script>
import {rStringProps, mapPaths} from "@/modules/utils";
import field from "@/components/field";
import state from "../state";
import produce from "immer";

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
		event(event) {
			const newEvent = produce(event, (draft) => {
				const update = draft.actions.update;

				// because of element-ui we have to update table item data here
				if (update) {
					Object.assign(update, {
						data: mapPaths(update.data),
						item: this.data
					});
				}
			});

			this.$emit("event", newEvent);
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
