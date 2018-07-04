<template>
	<div class="view">
		<!-- <breadcrumb :items="breadcrumb"/> -->
		<vView v-bind="{tableId, viewId}" :key="key" />
	</div>
</template>

<script>
import breadcrumb from "@/components/breadcrumb.vue";
import vView from "@/components/table/view/index.vue";

export default {
	components: {breadcrumb, vView},
	computed: {
		tableId: (t) => t.$route.params.tableId,
		viewId: (t) => t.$route.params.viewId,

		// meta: (t) => t.$route.meta,
		// breadcrumb: (t) => [
		// 	{to: {name: t.meta.id}, title: t.meta.id},
		// 	{title: t.id}
		// ],

		// don't rerender view on sequential batch
		key: (t) => t.$route.query.seq ? null : `${t.tableId}-${t.viewId}`
	}
};
</script>
