<template>
	<div class="pagination" :class="{loading}">
		<Pagination
			background
			layout="sizes, prev, pager, next"
			:page-sizes="[15, 50, 100]"
			v-bind="pagination"
			@size-change="size"
			@current-change="update"
		/>
	</div>
</template>

<script>
import {Pagination} from "element-ui";

export default {
	components: {Pagination},
	props: {
		loading: {type: Boolean, required: true},
		total: {type: Number, required: true},
		per_page: {type: Number, required: true}
	},
	computed: {
		query: (t) => t.$route.query,
		pagination: (t) => ({
			total: t.total,
			"page-size": t.per_page,
			"current-page": Number(t.$route.query.page) || 1
		})
	},
	methods: {
		update(page) {
			page = page === 1 ? undefined : page;
			this.$router.replace({query: {...this.query, page}});
			this.$emit("getData");
		},

		size(pagesize) {
			pagesize = pagesize === 15 ? undefined : pagesize;
			this.$router.replace({query: {...this.query, page: undefined, pagesize}});
			this.$emit("getData");
		}
	}
};
</script>

<style lang="scss" scoped>
.pagination {
	margin: 2em 0;
	text-align: center;
	transition: cubic(opacity, 0.1s);

	&.loading {
		pointer-events: none;
		opacity: 0.6;
	}
}
</style>
