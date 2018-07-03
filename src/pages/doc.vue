<template>
	<div class="doc">
		<div class="header">
			<div class="title">Doc</div>
		</div>

		<div class="page">
			<router-view/>
		</div>
	</div>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
.doc {
	$h: 3.5em;

	.header {
		z-index: 2;
		background-color: $white1;
		border-bottom: 1px solid $blue2;
		position: fixed;
		display: flex;
		align-items: center;
		width: 100%;
		height: $h;
		top: 0;
		left: 0;
		padding: 0 2em;

		.title {
			font-size: 1.5em;
			font-weight: 600;
		}
	}
	.page {
		padding-top: $h;
	}
}
</style>
