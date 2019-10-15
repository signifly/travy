<template>
	<action
		v-bind="{props, hide, data: parentData}"
		v-model="active"
		@event="$emit('event', $event)"
	>
		<div class="table-action">
			<Button size="medium" :type="status" @click="active = !active">
				{{ name }}
				<i class="el-icon-right" :class="`el-icon-${icon}`" v-if="icon" />
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
		status: {type: String, required: false, default: "primary"},
		parentData: {type: Object, required: false},
		props: {type: Object, required: true},
		hide: {type: Object, required: false},
		icon: {type: String, required: false},
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
.table-action {
	margin-left: 0.75em;
}
</style>
