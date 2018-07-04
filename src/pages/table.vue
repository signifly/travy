<template>
	<div class="table">
		<breadcrumb/>
		<vTable v-if="table" v-bind="{tableId, title}" :key="tableId"/>
	</div>
</template>

<script>
import breadcrumb from "@/components/breadcrumb.vue";
import vTable from "@/components/table/index.vue";
import {get} from "lodash";

export default {
	components: {breadcrumb, vTable},
	computed: {
		tableId: (t) => t.$route.params.tableId,
		title: (t) => get(t.table, "title"),
		table: (t) => t.$store.getters["config/tables"][t.tableId]
	},
	methods: {
		init() {
			if (!this.table) {
				this.$router.replace({name: "404"});
			} else {
				this.$watch(
					"$route",
					() => this.$meta({title: this.title}),
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
