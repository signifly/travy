<template>
	<div class="product">
		<breadcrumb :items="breadcrumb"/>

		<div class="header">
			header
		</div>

		
	</div>
</template>

<script>
import breadcrumb from "@/components/breadcrumb.vue";

export default {
	components: {breadcrumb},
	computed: {
		id: (t) => t.$route.params.id,

		breadcrumb: (t) => [
			{to: {name: "products"}, title: "products"},
			{to: {name: "product", id: t.id}, title: t.id}
		],


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
