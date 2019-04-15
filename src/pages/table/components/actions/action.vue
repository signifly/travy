<template>
	<action
		v-bind="{props, active, hide, data: parentData}"
		@close="toggle"
		@event="$emit('event', $event)"
	>
		<div class="table-action">
			<Button size="medium" :type="status" @click="toggle">
				{{ title }}
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
		props: {type: Object, required: true},
		hide: {type: Object, required: false},
		icon: {type: String, required: false},
		title: {type: String, required: true},
		status: {type: String, required: false, default: "primary"},
		parentData: {type: Object, required: false}
	},
	data() {
		return {
			active: false
		};
	},
	methods: {
		toggle() {
			this.active = !this.active;
		}
	}
};
</script>

<style lang="scss" scoped>
.table-action {
	margin-left: 0.75em;
}
</style>
