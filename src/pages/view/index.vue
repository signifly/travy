<template>
	<div class="view" v-if="definitions">
		<page v-bind="definitions" :key="key" />
	</div>
</template>

<script>
import page from "./page";

export default {
	components: {page},
	data: () => ({
		definitions: null
	}),
	computed: {
		url: (t) => `/definitions/view/${t.tableId}`,
		tableId: (t) => t.$route.params.tableId,
		key: (t) => `${t.tableId}-${t.viewId}`,
		viewId: (t) => t.$route.params.viewId,
		query: (t) => t.$route.query
	},
	methods: {
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
