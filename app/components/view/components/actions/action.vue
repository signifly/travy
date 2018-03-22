<template>
	<div class="action">
		<Button size="medium" :type="status" :icon="`el-icon-${icon}`" @click="toggle">{{title}}</Button>

		<component
			v-if="active"
			:is="comp"
			v-bind="props"
			position="bottom-right"
			:alt="alt"
			:endpoint="endpoint"
			@close="toggle"
			@fieldA="fieldA"
		/>
	</div>
</template>

<script>
import {Button} from "element-ui";
import * as actions from "@/components/actions";

export default {
	components: {Button, ...actions},
	props: {
		alt: {type: Object, required: true},
		props: {type: Object, required: true},

		icon: {type: String, required: false},
		title: {type: String, required: true},
		status: {type: String, required: false, default: "primary"},
		endpointId: {type: String, required: false, default: "destroy"}
	},
	data() {
		return {
			active: false
		}
	},
	computed: {
		comp: (t) => t.props.id,
		endpoint: (t) => t.alt.endpoints[t.endpointId]
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
.action {
	position: relative;
}
</style>
