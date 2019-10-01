<template>
	<layout>
		<div class="index">
			<div class="title">Travy</div>
			<div class="desc">Meta documentation</div>
		</div>
	</layout>
</template>

<script>
import layout from "@/pages/meta/layout.vue";

export default {
	components: {layout}
};
</script>

<style lang="scss" scoped>
.index {
	text-align: center;
	padding: 5em 0;

	.title {
		font-size: 2.5em;
		font-weight: 600;
		margin-bottom: 0.5em;
	}

	.desc {
		font-size: 1.25em;
		font-weight: 400;
	}
}
</style>
