<template>
	<popup type="list">
		<action
			:value="selected === action"
			v-for="action in actions"
			:key="action.title"
			v-on="$listeners"
			v-bind="action"
			:data="data"
		>
			<a class="item" @click="select(action)" v-text="action.title" />
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
		test() {
			console.log(this.$listeners);
		},
		select(action) {
			this.selected = this.selected ? null : action;
		}
	},
	beforeCreate() {
		this.$options.components.action = action;
	}
};
</script>
