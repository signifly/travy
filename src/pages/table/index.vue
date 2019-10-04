<template>
	<div class="table" v-if="data">
		<hero v-if="data" v-bind="{modifiers}" @refresh="refresh" />
		<div class="container">
			<tabs :tabs="data.tabs" :key="url + refreshKey" />
		</div>
	</div>
</template>

<script>
import hero from "@/components/hero";
import tabs from "@/components/tabs";

export default {
	components: {tabs, hero},
	data: () => ({
		refreshKey: 0,
		data: null
	}),
	computed: {
		url: (t) => `definitions/table/${t.tableId}`,
		tableId: (t) => t.$route.params.tableId,
		modifiers: (t) => t.data.modifiers,
		query: (t) => t.$route.query
	},
	methods: {
		async refresh() {
			await this.getData();
			this.refreshKey++;
		},
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
