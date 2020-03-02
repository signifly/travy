<template>
	<action
		@event="$emit('event', $event)"
		v-bind="actionType"
		v-model="active"
		:data="data"
	>
		<div class="view-action">
			<Button size="medium" :type="status" @click="active = !active">
				{{ name }}
				<i :class="`el-icon-${icon}`" v-if="icon" />
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
		icon: {type: String, required: false},
		data: {type: Object, required: false},
		name: {type: String, required: true}
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
	margin-left: 0.75em;
}
</style>
