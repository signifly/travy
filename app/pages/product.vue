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
	data() {
		return {
			data: null
		}
	},
	computed: {
		id: (t) => t.$route.params.id,

		breadcrumb: (t) => [
			{to: {name: "products"}, title: "products"},
			{to: {name: "product", id: t.id}, title: t.id}
		]
	},
	methods: {
		notify() {
			this.$notify({
				title: 'Success',
				message: 'This is a success message',
				type: 'success'
			});
		},

		getData() {
			this.data = {
				tabs: [
					{
						title: "Basis",
						data: {

						}
					},
					{
						title: "Content",
						data: {
							groups: [
								{
									title: "Product data",
									items: [
										{
											label: "Product name",
											value: "Breeze armchair"
										},
										{
											label: "Product id",
											value: 49918,
											readonly: true
										}
									]
								}
							]
						}
					}
				]
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.product {

}
</style>
