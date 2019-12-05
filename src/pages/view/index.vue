<template>
	<div class="view" v-if="definitions">
		<page
			:url="`/${indexId}/${viewId}`"
			v-bind="definitions"
			@refresh="getData"
			:key="refreshKey"
		/>
	</div>
</template>

<script>
import page from "./page";

export default {
	components: {page},
	data: () => ({
		definitions: null,
		refreshKey: 0
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

				this.definitions = data;
				this.refreshKey++;
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
