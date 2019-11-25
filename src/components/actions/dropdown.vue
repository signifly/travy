<template>
	<popup type="list">
		<action
			:value="selected === action"
			v-bind="action.actionType"
			v-for="action in actions"
			:key="action.name"
			v-on="$listeners"
			:data="data"
		>
			<a class="item" @click="select(action)" v-text="action.name" />
		</action>
	</popup>
</template>

<script>
import popup from "@/components/popup";
import action from "./index.vue";

export default {
	components: {popup},
	props: {
		data: {type: Object, required: false},
		actions: {type: Array, required: true}
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
