<template>
	<component :is="link ? 'router-link' : 'div'" class="table-field" :to="link">
		<vField v-bind="column" :alt="{data, type: 'table'}" @event="event" />
	</component>
</template>

<script>
import {rStringProps} from "@/modules/utils";
import vField from "@/components/field";
import state from "../state";

export default {
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
			const update = actions.update;

			this.$emit("event", {
				done,
				actions: {
					...actions,
					update: update && {item: this.data, data: update.data}
				}
			});
		}
	},
	beforeCreate() {
		this.$options.components.vField = vField;
	}
};
</script>

<style lang="scss" scoped>
.table-field {
	text-decoration: none;
	color: $black1;

	.field {
		margin: 0;
	}
}
</style>
