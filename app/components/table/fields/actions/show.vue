<template>
	<div class="view"></div>
</template>

<script>
export default {
	props: {
		item: {type: Object, required: true}
	},
	created() {
		this.$parent.$emit("show");
	}
};
</script>
