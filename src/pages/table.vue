<template>
	<div class="table" v-if="table">
		<vBreadcrumb :items="[{title, to: $route.path}]"/>
		<vTable v-bind="{tableId, title}" :key="tableId"/>
	</div>
</template>

<script>
import vBreadcrumb from "@/components/breadcrumb.vue";
import vTable from "@/components/table/index.vue";
import {get} from "lodash";

export default {
	components: {vBreadcrumb, vTable},
	computed: {
		table: (t) => t.$store.getters["config/tables"][t.tableId],
		tableId: (t) => t.$route.params.tableId,
		title: (t) => get(t.table, "title")
	},
	methods: {
		init() {
			if (!this.table) {
				this.$router.replace({name: "404"});
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
