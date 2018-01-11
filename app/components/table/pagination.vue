<template>
	<div class="pagination">
		<Pagination background layout="prev, pager, next" v-bind="pagination" @current-change="change" />
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
		pagination: (t) => ({
			total: t.data.total,
			"page-size": t.data.per_page,
			"current-page": t.data.current_page
		})
	},
	methods: {
		change(page) {
			this.$emit("page", page);
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
