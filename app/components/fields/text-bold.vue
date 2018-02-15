<template>
	<div class="text">{{text}}</div>
</template>

<script>
export default {
	props: {
		text: {type: [String, Number], required: false}
	},
	propsD: {
		text: "text",
	}
};
</script>

<style lang="scss" scoped>
.text {
	display: block;
	color: $black1;
	text-decoration: none;
	font-weight: 600;
}
</style>
