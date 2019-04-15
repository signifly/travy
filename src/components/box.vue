<template>
	<div class="box">
		<slot />
	</div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.box {
	background-color: $white1;
	border: 1px solid $blue2;
	border-radius: 4px;
}
</style>
