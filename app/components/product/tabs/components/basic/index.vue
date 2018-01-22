<template>
	<div class="basic">
		<div class="sections">
			<vSection v-for="section in data.sections" v-bind="section" :key="section.title" />
		</div>
	</div>
</template>

<script>
import vSection from "./section.vue";

export default {
	components: {vSection},
	props: {
		label: {type: String, required: true},
		endpoint: {type: String, required: true}
	},
	data() {
		return {
			data: null
		}
	},
	methods: {
		async getData() {

			this.data = {
				sections: [
					{
						title: "product data",
						fields: [
							{
								label: "product name",
								value: "stol"
							},
							{
								label: "Product ID",
								value: 49918,
								disabled: true
							}
						]
					},
					{
						title: "Dimensions",
						fields: [
							{
								label: "Seat height",
								value: 60,
								unit: "cm",
								outdated: true
							},
							{
								label: "Seat width",
								value: 30,
								unit: "cm",
							},
							{
								label: "Seat height",
								value: 60,
								unit: "cm"
							},
							{
								label: "Seat width",
								value: 30,
								unit: "cm"
							},
							{
								label: "Seat height",
								value: 60,
								unit: "cm"
							},
							{
								label: "Seat width",
								value: 30,
								unit: "cm"
							},
							{
								label: "Seat height",
								value: 60,
								unit: "cm"
							},
							{
								label: "Seat width",
								value: 30,
								unit: "cm"
							},{
								label: "Seat height",
								value: 60,
								unit: "cm"
							},
							{
								label: "Seat width",
								value: 30,
								unit: "cm"
							},
							{
								label: "Seat height",
								value: 60,
								unit: "cm"
							},
							{
								label: "Seat width",
								value: 30,
								unit: "cm"
							}
						]
					}
				]
			};

		}
	},
	created() {
		this.getData();
	}
};
</script>

<style lang="scss" scoped>
.basic {
	.sections {
		
	}
}
</style>
