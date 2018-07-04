<template>
	<div class="table">
		<breadcrumb/>
		<vTable v-if="table" v-bind="{id, title}" :key="id"/>
	</div>
</template>

<script>
import breadcrumb from "@/components/breadcrumb.vue";
import vTable from "@/components/table/index.vue";

export default {
	components: {breadcrumb, vTable},
	computed: {
		title: (t) => t.table.title,
		id: (t) => t.$route.params.tableId,
		table: (t) => t.$store.getters["config/tables"][t.id]
	},
	watch: {
		$route: {
			immediate: true,
			handler() {
				this.$meta({title: this.title});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.table {
	margin-bottom: 4em;
}
</style>
