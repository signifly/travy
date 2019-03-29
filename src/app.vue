<template>
	<div class="app" v-if="config">
		<component :is="layout" v-if="layout"/>
	</div>
</template>

<script>
import layouts from "./components/layouts";

export default {
	computed: {
		config: (t) => t.$store.getters["config/data"],

		layout() {
			const name = this.$route.meta.layout;

			if (name) {
				return layouts[name];
			}
		}
	},
	beforeCreate() {
		this.$store.dispatch("config/data");
	}
};
</script>
