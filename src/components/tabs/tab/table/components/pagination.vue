<template>
	<div class="pagination" :class="{loading}">
		<Pagination
			background
			layout="sizes, prev, pager, next"
			:page-sizes="[15, 50, 100]"
			v-bind="pagination"
			@size-change="updateSize"
			@current-change="updatePage"
		/>
	</div>
</template>

<script>
import {Pagination} from "element-ui";

export default {
	components: {Pagination},
	props: {
		current_page: {type: Number, required: true},
		loading: {type: Boolean, required: true},
		per_page: {type: Number, required: true},
		total: {type: Number, required: true},
		state: {type: Object, required: true}
	},
	computed: {
		pagination: (t) => ({
			"current-page": t.current_page,
			"page-size": t.per_page,
			total: t.total
		})
	},
	methods: {
		updatePage(page) {
			page = page === 1 ? undefined : page;

			this.state.mergeQuery({
				type: "replace",
				query: {page}
			});

			this.$emit("getData");
		},

		updateSize(pagesize) {
			pagesize = pagesize === 15 ? undefined : pagesize;

			this.state.mergeQuery({
				type: "replace",
				query: {page: undefined, pagesize}
			});

			this.$emit("getData");
		}
	}
};
</script>

<style lang="scss" scoped>
.pagination {
	transition: cubic(opacity, 0.1s);
	border-top: 1px solid #ebeef5;
	text-align: center;
	padding: 1.5em 0;

	&.loading {
		pointer-events: none;
		opacity: 0.6;
	}
}
</style>
