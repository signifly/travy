<template>
	<action
	v-bind="{props, active, data}"
	@close="toggle"
	@fieldA="fieldA">

		<div class="view-action">
			<Button size="medium" :type="status" :icon="`el-icon-${icon}`" @click="toggle">{{title}}</Button>
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

		fieldA(obj) {
			this.active = false;
			this.$emit("fieldA", obj);
		},
	}
};
</script>

<style lang="scss" scoped>
.view-action {
	margin-left: 0.5em;
}
</style>
