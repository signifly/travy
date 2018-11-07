<template>
	<div class="view" v-if="table">
		<vBreadcrumb :items="breadcrumb"/>
		<vView v-bind="{requests}" :key="viewKey" />
	</div>
</template>

<script>
import vBreadcrumb from "@/components/breadcrumb.vue";
import vView from "@/components/view";

export default {
	components: {vBreadcrumb, vView},
	computed: {
		tableId: (t) => t.$route.params.tableId,
		table: (t) => t.$store.getters["config/tables"][t.tableId],

		viewId: (t) => t.$route.params.viewId,
		viewKey: (t) => t.$route.query.sequential ? null : `${t.tableId}-${t.viewId}`, // don't rerender view on sequential batch

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
