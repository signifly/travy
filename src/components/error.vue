<template>
	<div class="error">
		<div class="title"><slot name="title"/></div>
		<div class="text"><slot name="text"/>&nbsp;&nbsp;(-_-｡)</div>
	</div>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
.error {
	text-align: center;
	margin: 7em 0 2em;
	color: $blue1;

	.title {
		font-size: 5em;
		margin-bottom: 0.75em;
		font-weight: 600;
	}
}
</style>
