<template>
	<div class="pagination">
		<Pagination background layout="prev, pager, next" v-bind="pagination" @current-change="update" />
	</div>
</template>

<script>
import {Pagination} from "element-ui";

export default {
	components: {Pagination},
	props: {
		data: {type: Object, required: true}
	},
	computed: {
		query: (t) => t.$route.query,
		pagination: (t) => ({
			total: t.data.total,
			"page-size": t.data.per_page,
			"current-page": Number(t.$route.query.page) || 1
		})
	},
	methods: {
		update(page) {
			page = page === 1 ? undefined : page;
			this.$router.replace({query: {...this.query, page}});
			this.$emit("getData");
		}
	}
};
</script>

<style lang="scss" scoped>
.pagination {
	margin: 2em 0;
	text-align: center;
}
</style>
