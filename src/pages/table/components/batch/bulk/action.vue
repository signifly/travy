<template>
	<action
		v-bind="[actionC, {active}]"
		:actionProps="{position: 'top-right'}"
		@close="$emit('close', $event)"
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
		active: {type: Boolean, required: true},
		action: {type: Object, required: true},
		ids: {type: Array, required: true}
	},
	computed: {
		actionC: (t) =>
			merge({}, t.action, {
				props: {payload: {data: {ids: t.ids}}}
			})
	}
};
</script>

<style lang="scss" scoped>
.item {
	user-select: none;
}
</style>
