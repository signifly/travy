<template>
	<div class="app" v-if="loaded">
		<component :is="layout" />
	</div>
</template>

<script>
import layouts from "./components/layouts";

export default {
	data: () => ({
		loaded: false
	}),
	computed: {
		layout: (t) => layouts[t.$route.meta.layout || "main"]
	},
	async created() {
		try {
			await this.$store.dispatch("config/data");
		} catch (err) {
			this.$router.replace({name: "error", params: {status: 500}});
		} finally {
			this.loaded = true;
		}
	}
};
</script>
