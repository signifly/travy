<template>
	<div class="languages">
		<breadcrumb />
		<mainTable v-bind="{id, title}"></mainTable>
	</div>
</template>

<script>
import breadcrumb from "@/components/breadcrumb.vue";
import mainTable from "@/components/table/main.vue";


export default {
	components: {breadcrumb, mainTable},
	data() {
		return {
			id: "languages",
			title: "Languages"
		}
	}
};
</script>
