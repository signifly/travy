<template>
	<div class="dashboard" v-if="dashboard">
		<breadcrumb :items="[{title, to: $route.path}]" />
		<page v-bind="{defsEndpoint, title}" :key="id" />
	</div>
</template>

<script>
import breadcrumb from "@/components/breadcrumb.vue";
import page from "./page.vue";
import {get} from "lodash";

export default {
	components: {breadcrumb, page},
	computed: {
		defsEndpoint: (t) => ({url: `definitions/dashboard/${t.id}`}),
		dashboard: (t) => t.$store.getters["config/dashboards"][t.id],
		title: (t) => get(t.dashboard, "title", {}),
		id: (t) => t.$route.params.id
	},
	watch: {
		$route: {
			immediate: true,
			handler() {
				this.$store.dispatch("base/meta", {title: this.title.text});
			}
		}
	},
	created() {
		if (!this.dashboard) {
			this.$router.replace({name: "error"});
		}
	}
};
</script>

<style lang="scss" scoped>
.dashboard {
	margin-bottom: 4em;
}
</style>
