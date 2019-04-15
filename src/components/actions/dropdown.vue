<template>
	<popup type="list">
		<action
			v-for="action in actions"
			v-bind="[action, {data}]"
			:active="selected === action"
			:key="action.title"
			@event="$emit('event', $event)"
			@submit="$emit('submit', $event)"
			@close="$emit('close')"
		>
			<a class="item" @click="select(action)">
				{{ action.title }}
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
