<template>
	<div class="activity">
		<div class="title">Activity</div>
		<Table :definitions="activity" :parentData="data" />
	</div>
</template>

<script>
import Table from "@/components/tabs/tab/table";

export default {
	components: {Table},
	props: {
		activity: {type: Object, required: true},
		data: {type: Object, required: true},
		url: {type: String, required: true}
	}
};
</script>

<style lang="scss" scoped>
.activity {
	background-color: $white1;
	border: 1px solid #e0e6ed;
	border-radius: 4px;
	margin: 1.5em 0;

	.title {
		border-bottom: 1px solid #e0e6ed;
		font-weight: 500;
		padding: 1em;
	}
}
</style>
