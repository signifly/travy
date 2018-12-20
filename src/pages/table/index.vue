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
		table: (t) => t.$store.getters["config/tables"][t.tableId],
		tableId: (t) => t.$route.params.tableId,
		title: (t) => get(t.table, "title"),
		defsEndpoint: (t) => ({
			url: `definitions/table/${t.tableId}`
		})
	},
	methods: {
		init() {
			if (!this.table) {
				this.$router.replace({name: "error"});
			} else {
				this.$watch(
					"$route",
					() => this.$store.dispatch("base/meta", {title: this.title}),
					{immediate: true}
				);
			}
		}
	},
	created() {
		this.init();
	}
};
</script>

<style lang="scss" scoped>
.table {
	margin-bottom: 4em;
}
</style>
