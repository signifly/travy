<template>
	<action
	v-bind="[action, {data, active}]"
	position="top-right"
	@close="close"
	@fieldA="fieldA">

		<DropdownItem class="item" :command="action">{{action.title}}</DropdownItem>
	</action>
</template>

<script>
import {DropdownItem} from "element-ui";
import action from "@/components/actions";

export default {
	components: {DropdownItem, action},
	props: {
		active: {type: Boolean, required: true},
		action: {type: Object, required: true},
		ids: {type: Array, required: true}
	},
	computed: {
		data() {
			return {...this.action.props.data, ids: this.ids};
		}
	},
	methods: {
		close() {
			this.$emit("close");
		},
		fieldA(obj) {
			this.$emit("fieldA", obj);
		}
	}
};
</script>

<style lang="scss" scoped>
.item {
	user-select: none;
}
</style>
