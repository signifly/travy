<template>
	<div class="pagination" v-if="active">
		<Pagination
			small background
			layout="prev, pager, next"
			:total="total"
			:page-size="per_page"
			@current-change="update"
		/>
	</div>
</template>

<script>
import {Pagination} from "element-ui";

export default {
	components: {Pagination},
	props: {
		total: {type: Number, required: true},
		per_page: {type: Number, required: true},
		last_page: {type: Number, required: true}
	},
	computed: {
		active: (t) => t.last_page > 1
	},
	methods: {
		update(page) {
			this.$emit("update", page);
		}
	}
};
</script>

<style lang="scss" scoped>
.pagination {
	margin-top: 1.5em;
	display: flex;
	justify-content: center;
}
</style>
