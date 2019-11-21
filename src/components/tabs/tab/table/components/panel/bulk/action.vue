<template>
	<action
		v-bind="actionC"
		:value="active"
		@input="$emit('close', $event)"
		@event="$emit('event', $event)"
	>
		<DropdownItem class="item" :command="action">
			{{ action.title }}
		</DropdownItem>
	</action>
</template>

<script>
import {merge} from "lodash";
import {DropdownItem} from "element-ui";
import action from "@/components/actions";

export default {
	components: {DropdownItem, action},
	props: {
		selected: {type: Object, required: true},
		active: {type: Boolean, required: true},
		action: {type: Object, required: true}
	},
	computed: {
		ids: (t) => t.selected.items.map((x) => x.id),
		actionC: (t) =>
			merge({}, t.action, {
				actionType: {props: {payload: {bulk: t.ids}}}
			})
	}
};
</script>

<style lang="scss" scoped>
.item {
	user-select: none;
}
</style>
