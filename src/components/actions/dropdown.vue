<template>
	<popup type="list" :position="actionOpts.position">
		<action
			:value="selected === action"
			v-bind="action.actionType"
			v-for="action in actions"
			:actionOpts="actionOpts"
			:key="action.name"
			v-on="$listeners"
			:data="data"
		>
			<a class="item" @click="select(action)">
				<div v-text="action.name" />
				<i :class="`el-icon-${action.icon}`" v-if="action.icon" />
			</a>
		</action>
	</popup>
</template>

<script>
import popup from "@/components/popup";
import action from "./index.vue";

export default {
	components: {popup},
	props: {
		actionOpts: {type: Object, required: true},
		actions: {type: Array, required: true},
		data: {type: Object, required: false}
	},
	data() {
		return {
			selected: null
		};
	},
	methods: {
		select(action) {
			this.selected = this.selected ? null : action;
		}
	},
	beforeCreate() {
		this.$options.components.action = action;
	}
};
</script>
