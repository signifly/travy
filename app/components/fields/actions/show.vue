<template>
	<div class="view"></div>
</template>

<script>
export default {
	props: {
		item: {type: Object, required: true}
	},
	created() {
		this.$emit("close");
		this.$parent.$emit("fieldA", {action: "show"});
	}
};
</script>
