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
import state from "../state";

export default {
	components: {Pagination},
	props: {
		total: {type: Number, required: true},
		loading: {type: Boolean, required: true},
		per_page: {type: Number, required: true}
	},
	computed: {
		query: () => state.query,
		pagination: (t) => ({
			total: t.total,
			"page-size": t.per_page,
			"current-page": Number(t.$route.query.page) || 1
		})
	},
	methods: {
		updatePage(page) {
			page = page === 1 ? undefined : page;

			state.setQuery({type: "replace", query: {
				...this.query,
				page
			}});

			this.$emit("getData");
		},

		updateSize(pagesize) {
			pagesize = pagesize === 15 ? undefined : pagesize;

			state.setQuery({type: "replace", query: {
				...this.query,
				page: undefined,
				pagesize
			}});

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
