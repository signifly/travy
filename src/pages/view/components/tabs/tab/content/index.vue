<template>
	<transition name="el-fade-in" appear>
		<component :is="comp" ref="comp" v-bind="[tab, {parentData: data}]" :state.sync="stateC"/>
	</transition>
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
			if (this.$refs.comp.save) {
				await this.$refs.comp.save();
			}
		}
	}
};
</script>
