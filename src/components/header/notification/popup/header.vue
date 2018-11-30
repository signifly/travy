<template>
	<div class="header">
		<div class="loading"><i class="el-icon-loading" v-if="loading"/></div>
		<Button size="mini" icon="el-icon-check" plain @click="markAllRead">Mark all as read</Button>
	</div>
</template>

<script>
import {Button} from "element-ui";

export default {
	components: {Button},
	props: {
		loading: {type: Boolean, required: true}
	},
	methods: {
		async markAllRead() {
			await this.$axios.post("account/read-notifications", {data: {all: true}});
			this.$emit("updateItems", {is_read: true});
		}
	}
};
</script>

<style lang="scss" scoped>
.header {
	padding: 1em;
	display: flex;
	border-bottom: 2px solid $blue5;
	justify-content: space-between;
	align-items: center;
	flex-shrink: 0;

	.loading {
		color: $blue5;
	}
}
</style>
