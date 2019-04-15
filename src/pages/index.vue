<template>
	<div class="index" />
</template>

<script>
export default {
	computed: {
		frontpage() {
			return this.$store.getters["config/frontpage"];
		}
	},
	created() {
		this.$router.replace(this.frontpage);
	}
};
</script>
