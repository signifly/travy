<template>
	<div class="bulk">
		<action
			@event="$emit('event', $event)"
			v-bind="action.actionType"
			:actionOpts="actionOpts"
			v-model="active"
		>
			<div class="button-action">
				<Button size="medium" :type="action.status" @click="active = !active">
					{{ action.name }}
					<i :class="`el-icon-${action.icon}`" v-if="action.icon" />
				</Button>
			</div>
		</action>
	</div>
</template>

<script>
import action from "@/components/actions";
import {Button} from "element-ui";

export default {
	components: {Button, action},
	props: {
		selected: {type: Object, required: true},
		action: {type: Object, required: true}
	},
	data: () => ({
		active: false
	}),
	computed: {
		actionOpts: (t) => ({
			position: "top-right",
			payload: {
				bulk: {ids: t.selected.items.map((x) => x.id)}
			}
		})
	}
};
</script>
