<template>
	<div class="table" v-if="data">
		<breadcrumb :items="[{title: data.title, to: $route.path}]" />
		<h1>{{ data.title }}</h1>
		<tabs :tabs="data.tabs" :key="url" />
	</div>
</template>

<script>
import breadcrumb from "@/components/breadcrumb.vue";
import tabs from "@/components/tabs";

export default {
	components: {breadcrumb, tabs},
	data: () => ({
		data: null
	}),
	computed: {
		url: (t) => `definitions/table/${t.tableId}`,
		tableId: (t) => t.$route.params.tableId,
		query: (t) => t.$route.query
	},
	methods: {
		async getData() {
			const {data} = await this.$axios.get(this.url, {
				params: {modifiers: this.query.modifiers}
			});

			this.data = data;
			this.$store.dispatch("base/meta", {title: data.title});
		}
	},
	created() {
		this.getData();
	}
};
</script>

<style lang="scss" scoped>
.table {
	margin-bottom: 4em;
}
</style>
