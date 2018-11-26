<template>
	<component :is="comp" ref="comp" v-bind="[tab, {parentData: data}]" :state.sync="stateC"/>
</template>

<script>
export default {
	props: {
		tab: {type: Object, required: true},
		data: {type: Object, required: true},
		state: {type: Object, required: true}
	},
	computed: {
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
			await this.$refs.comp.save();
		}
	}
};
</script>
