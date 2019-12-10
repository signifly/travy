<template>
	<div class="home" />
</template>

<script>
export default {
	computed: {
		frontpage() {
			return this.$store.getters["config/data"].frontpage;
		}
	},
	created() {
		this.$router.replace(this.frontpage);
	}
};
</script>
