<template>
	<div class="product">

		<a @click="notify">Success</a>
	</div>
</template>

<script>
export default {
	data() {
		return {

		}
	},
	methods: {
		notify() {
			this.$notify({
				title: 'Success',
				message: 'This is a success message',
				type: 'success'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.product {

}
</style>
