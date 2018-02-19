<template>
	<div class="text">{{text}}</div>
</template>

<script>
export default {
	meta: {
		res: {
			props: {
				text: "title"
			},
			data: {
				title: "some text"
			}
		}
	},
	props: {
		text: {type: [String, Number], required: false, doc: true}
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
