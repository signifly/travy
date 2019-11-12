<template>
	<action
		v-model="active"
		v-bind="actionType"
		:data="data"
		@event="$emit('event', $event)"
	>
		<div class="view-action">
			<Button size="medium" :type="status" @click="active = !active">
				{{ title }}
				<i
					class="el-icon-arrow-right el-icon-right"
					:class="`el-icon-${icon} el-icon-right`"
					v-if="icon"
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
		actionType: {type: Object, required: true},
		status: {type: String, required: false},
		title: {type: String, required: true},
		icon: {type: String, required: false},
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
