<template>
	<div class="show"></div>
</template>

<script>
export default {
	props: {
		item: {type: Object, required: true}
	},
	created() {
		// this.$emit("close");
		// this.$parent.$emit("fieldA", {action: "show", data: this.item});
	}
};
</script>
