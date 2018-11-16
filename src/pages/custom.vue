<template>
	<div class="custom" v-if="custom">
		<component :is="component"/>
	</div>
</template>

<script>
import Vue from "vue";

export default {
	computed: {
		src: (t) => t.custom.src,
		id: (t) => t.$route.params.id,
		component: (t) => t.custom.component,
		custom: (t) => t.$store.getters["config/customs"][t.id]
	},
	methods: {
		load() {
			const exists = document.querySelector(`script[src='${this.src}']`);

			if (!exists) {
				Vue.config.ignoredElements = [this.component];
				const script = document.createElement("script");
				script.src = this.src;
				document.head.appendChild(script);
			}
		}
	},
	created() {
		if (this.custom) {
			this.load();
		} else {
			this.$router.replace({name: "error"});
		}
	}
};
</script>

<style lang="scss" scoped>

</style>
