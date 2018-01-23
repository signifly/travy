<template>
	<div class="table">
		<breadcrumb/>
		<mainTable v-bind="{id, title}" :key="id"></mainTable>
	</div>
</template>

<script>
import breadcrumb from "@/components/breadcrumb.vue";
import mainTable from "@/components/table/main.vue";

import tables from "@/modules/tables";

export default {
	components: {breadcrumb, mainTable},
	computed: {
		id: (t) => t.$route.name,
		title: (t) => tables[t.id].title
	}
};
</script>
