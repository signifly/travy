<template>
	<popup :list="true">
		<action
		v-for="action in actions"
		v-bind="action"
		:active="selected === action"
		:key="action.title"
		@close="close"
		@fieldA="fieldA">

			<a class="item" @click="select(action)">
				{{action.title}}
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
		actions: {type: Array, required: true}
	},
	data() {
		return {
			selected: null
		}
	},
	methods: {
		select(action) {
			this.selected = this.selected ? null : action;
		},

		fieldA(obj) {
			this.$emit("fieldA", obj);
		},

		close() {
			this.selected = null;
		}
	},
	beforeCreate() {
		this.$options.components.action = action;
	}
};
</script>
