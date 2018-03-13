<template>
	<div class="action">
		<Button size="medium" :type="status" :icon="`el-icon-${icon}`" @click="toggle">{{title}}</Button>

		<component
			v-if="active"
			:is="comp"
			v-bind="props"
			:endpoint="endpoint"
			@close="toggle"
			@submit="submit"
		/>
	</div>
</template>

<script>
import {Button} from "element-ui";
import * as actions from "@/components/actions";

export default {
	components: {Button, ...actions},
	props: {
		endpoints: {type: Object, required: true},
		props: {type: Object, required: true},

		icon: {type: String, required: false},
		title: {type: String, required: true},
		status: {type: String, required: false, default: "primary"},
		endpointId: {type: String, required: true}
	},
	data() {
		return {
			active: false
		}
	},
	computed: {
		comp: (t) => t.props.id,
		endpoint: (t) => t.endpoints[t.endpointId]
	},
	methods: {
		toggle() {
			this.active = !this.active;
		},

		submit() {
			this.active = false;
			this.$parent.$emit("submit");
		}
	}
};
</script>

<style lang="scss" scoped>
.action {

}
</style>
