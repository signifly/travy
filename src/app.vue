<template>
	<div class="app" v-if="loaded">
		<component :is="layout" v-if="config && layout" />
		<error :status="500" v-else />
	</div>
</template>

<script>
import layouts from "./components/layouts";
import error from "./pages/error";

export default {
	components: {error},
	data: () => ({
		loaded: false
	}),
	computed: {
		config: (t) => t.$store.getters["config/data"],
		layout: (t) => layouts[t.$route.meta.layout]
	},
	async beforeCreate() {
		await this.$store.dispatch("config/data");
		this.loaded = true;
	}
};
</script>
