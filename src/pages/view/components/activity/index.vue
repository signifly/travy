<template>
	<div class="activity">
		<div class="title">Activity</div>

		<div class="box">
			<Table :definitions="activity" :parentData="data" />
		</div>
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
	margin: 4em 0;

	.title {
		font-size: 1.2em;
		margin-bottom: 1em;
		font-weight: 500;
	}

	.box {
		background-color: $white1;
		border: 1px solid #e0e6ed;
		border-radius: 4px;
	}
}
</style>
