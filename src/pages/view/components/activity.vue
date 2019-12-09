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
	margin-top: 4em;

	.title {
		margin-left: 0.25em;
		margin-bottom: 1em;
	}

	.box {
		background-color: $white1;
		border: 1px solid #e0e6ed;
		border-radius: 4px;

		.table {
			clip-path: inset(0 round 4px);
		}
	}
}
</style>
