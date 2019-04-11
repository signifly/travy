<template>
	<action
	v-bind="{props, active, hide, data}"
	@close="toggle"
	@event="event">

		<div class="view-action">
			<Button size="medium" :type="status" @click="toggle">
				{{title}}
				<i class="el-icon-arrow-right el-icon-right" :class="`el-icon-${icon} el-icon-right`" v-if="icon"/>
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
		data: {type: Object, required: true},
		hide: {type: Object, required: false},
		props: {type: Object, required: true},
		icon: {type: String, required: false},
		title: {type: String, required: true},
		status: {type: String, required: false, default: "primary"}
	},
	data() {
		return {
			active: false
		}
	},
	methods: {
		toggle() {
			this.active = !this.active;
		},

		event(e) {
			this.active = false;
			this.$emit("event", e);
		},
	}
};
</script>

<style lang="scss" scoped>
.view-action {
	margin-left: 0.5em;
}
</style>
