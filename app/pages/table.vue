<template>
	<div class="table">
		<breadcrumb/>
		<mainTable v-bind="{id, title}" :key="id"/>
	</div>
</template>

<script>
import breadcrumb from "@/components/breadcrumb.vue";
import mainTable from "@/components/tables/main.vue";

export default {
	components: {breadcrumb, mainTable},
	computed: {
		id: (t) => t.$route.name,
		title: (t) => t.$route.meta.title
	}
};
</script>
