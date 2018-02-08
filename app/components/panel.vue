<template>
	<transition name="el-zoom-in-bottom" appear>
		<div class="panel">
			<div class="wrap">
				<slot/>
			</div>
		</div>
	</transition>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
.panel {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	max-width: $width;
	margin: 0 auto;

	.wrap {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.5em 1em;
		background-color: $white1;
		border-top: 1px solid $blue3;
	}
}
</style>
