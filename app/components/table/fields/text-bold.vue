<template>
	<div class="text">
		{{text}}
	</div>
</template>

<script>
export default {
	props: {
		text: {type: String, required: true}
	}
};
</script>

<style lang="scss" scoped>
.text {
	font-weight: 600;
}
</style>
