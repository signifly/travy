<template>
	<vPage>
		<div class="index">
			<div class="title">Travy</div>
			<div class="desc">Frontend documentation</div>
		</div>
	</vPage>
</template>

<script>
import vPage from "./page.vue";

export default {
	components: {vPage}
};
</script>

<style lang="scss" scoped>
.index {
	text-align: center;

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
