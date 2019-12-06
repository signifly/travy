<template>
	<router-link :to="link" class="link">
		<div class="back" />
		<i class="el-icon-info" />
	</router-link>
</template>

<script>
export default {
	props: {
		link: {type: String, required: true}
	}
};
</script>

<style lang="scss" scoped>
.link {
	position: absolute;
	bottom: 0;
	right: 0;

	i {
		position: relative;
		font-size: 0.75em;
		color: $blue4;
		$s: 2px;
		margin: 0 $s $s 0;
	}

	.back {
		$s: 28px;

		border-left: $s solid transparent;
		border-bottom: $s solid $blue2;
		position: absolute;
		height: 0;
		bottom: 0;
		width: 0;
		right: 0;
	}
}
</style>
