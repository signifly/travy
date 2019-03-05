<template>
	<div class="table" v-if="table">
		<breadcrumb :items="[{title, to: $route.path}]"/>
		<page v-bind="{defsEndpoint, title}" :key="tableId"/>
	</div>
</template>

<script>
import breadcrumb from "@/components/breadcrumb.vue";
import page from "./page.vue";
import {get} from "lodash";

export default {
	components: {breadcrumb, page},
	computed: {
		defsEndpoint: (t) => ({url: `definitions/table/${t.tableId}`}),
		table: (t) => t.$store.getters["config/tables"][t.tableId],
		tableId: (t) => t.$route.params.tableId,
		title: (t) => get(t.table, "title")
	},
	watch: {
		$route: {
			immediate: true,
			handler() {
				this.$store.dispatch("base/meta", {title: this.title});
			}
		}
	},
	created() {
		if (!this.table) {
			this.$router.replace({name: "error"});
		}
	}
};
</script>

<style lang="scss" scoped>
.table {
	margin-bottom: 4em;
}
</style>
