<template>
	<div>

	</div>
</template>

<script>
export default {
	computed: {
		id: (t) => t.$route.params.id,
		custom: (t) => t.$store.getters["config/customs"][t.id]
	},
	created() {
		if (!this.custom) {
			this.$router.replace({name: "error"});
		}
	}
};
</script>

<style lang="scss" scoped>

</style>
