<template>
	<div class="view" v-if="definitions">
		<page v-bind="definitions" :key="refreshKey" @refresh="getData" />
	</div>
</template>

<script>
import page from "./page";

export default {
	components: {page},
	data: () => ({
		refreshKey: 0,
		definitions: null
	}),
	computed: {
		url: (t) => `/definitions/view/${t.indexId}`,
		indexId: (t) => t.$route.params.indexId,
		viewId: (t) => t.$route.params.viewId,
		query: (t) => t.$route.query
	},
	methods: {
		async getData() {
			try {
				const {data} = await this.$axios.get(this.url, {
					params: {modifiers: this.query.modifiers}
				});

				this.refreshKey++;
				this.definitions = data;
				this.$store.dispatch("base/meta", {title: data.title});
			} catch ({status}) {
				this.$router.replace({name: "error", params: {status}});
			}
		}
	},
	created() {
		this.getData();
	}
};
</script>
