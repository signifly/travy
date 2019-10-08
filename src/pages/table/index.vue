<template>
	<div class="table" v-if="definitions">
		<hero v-if="definitions" v-bind="{modifiers, title}" @refresh="refresh" />
		<div class="container">
			<tabs :tabs="definitions.tabs" :key="url + refreshKey" />
		</div>
	</div>
</template>

<script>
import hero from "@/components/hero";
import tabs from "@/components/tabs";

export default {
	components: {tabs, hero},
	data: () => ({
		definitions: null,
		refreshKey: 0
	}),
	computed: {
		url: (t) => `definitions/table/${t.tableId}`,
		modifiers: (t) => t.definitions.modifiers,
		tableId: (t) => t.$route.params.tableId,
		title: (t) => t.definitions.title,
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

			this.definitions = data;
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
