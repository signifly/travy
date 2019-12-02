<template>
	<popup type="list" :position="actOptions.position">
		<action
			:value="selected === action"
			v-bind="action.actionType"
			v-for="action in actions"
			:actOptions="actOptions"
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
		actOptions: {type: Object, required: true},
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
