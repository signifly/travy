<template>
	<component
		:is="comp"
		ref="comp"
		v-bind="[tab, {parentData: data}]"
		:state.sync="stateC"
		@event="$emit('event', $event)"
	/>
</template>

<script>
export default {
	props: {
		tab: {type: Object, required: true},
		data: {type: Object, required: true},
		state: {type: Object, required: true}
	},
	computed: {
		edit: (t) => t.state.edit,
		stateC: {
			get() {
				return this.state;
			},
			set(state) {
				this.$emit("update:state", state);
			}
		},
		comp() {
			return () => import(/* webpackMode: "eager" */ `./${this.tab.type}.vue`);
		}
	},
	methods: {
		async save() {
			if (this.$refs.comp.save && this.edit) {
				return await this.$refs.comp.save();
			}
		}
	}
};
</script>
