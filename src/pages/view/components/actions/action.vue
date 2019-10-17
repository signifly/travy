<template>
	<action
		v-model="active"
		v-bind="action"
		:data="data"
		@event="$emit('event', $event)"
	>
		<div class="view-action">
			<Button size="medium" :type="action.status" @click="active = !active">
				{{ action.title }}
				<i
					class="el-icon-arrow-right el-icon-right"
					:class="`el-icon-${action.icon} el-icon-right`"
					v-if="action.icon"
				/>
			</Button>
		</div>
	</action>
</template>

<script>
import {Button} from "element-ui";
import action from "@/components/actions";

export default {
	components: {Button, action},
	props: {
		action: {type: Object, required: true},
		data: {type: Object, required: true}
	},
	data() {
		return {
			active: false
		};
	}
};
</script>

<style lang="scss" scoped>
.view-action {
	margin-left: 0.5em;
}
</style>
