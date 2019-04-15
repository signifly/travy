<template>
	<div class="view" v-if="table">
		<vBreadcrumb :items="breadcrumb" />
		<page v-bind="[{tableId, requests}]" :key="viewKey" />
	</div>
</template>

<script>
import vBreadcrumb from "@/components/breadcrumb.vue";
import page from "./page.vue";

export default {
	components: {vBreadcrumb, page},
	computed: {
		tableId: (t) => t.$route.params.tableId,
		table: (t) => t.$store.getters["config/tables"][t.tableId],

		viewId: (t) => t.$route.params.viewId,
		viewKey: (t) => `${t.tableId}-${t.viewId}`,

		requests: (t) => ({
			data: `${t.tableId}/${t.viewId}`,
			definitions: `definitions/view/${t.tableId}`
		}),

		breadcrumb: (t) => [
			{title: t.table.title, to: `/t/${t.tableId}`},
			{title: t.viewId, to: t.$route.path}
		]
	},
	created() {
		if (!this.table) {
			this.$router.replace({name: "error"});
		}
	}
};
</script>
