<template>
	<div class="product">
		<breadcrumb :items="breadcrumb"/>

		<div class="header">
			header
		</div>

		<div class="main">
			<Row>
				<Col :span="16">
					<productTabs v-bind="{tabs}" />
				</Col>
				<Col :span="8">
					right
				</Col>
			</Row>
		</div>

	</div>
</template>

<script>
import breadcrumb from "@/components/breadcrumb.vue";
import {Row, Col} from "element-ui";
import productTabs from "@/components/product/tabs/index.vue";

export default {
	components: {breadcrumb, Row, Col, productTabs},
	data() {
		return {
			data: null,
			tab: ""
		}
	},
	computed: {
		breadcrumb: (t) => [
			{to: {name: "products"}, title: "products"},
			{to: {name: "product", id: t.id}, title: t.id}
		],

		id: (t) => t.$route.params.id,
		tabs: (t) => t.data.tabs

	},
	methods: {
		getData() {
			this.data = {
				tabs: [
					{
						id: "basic",
						label: "Basic",
						status: "warning",
						endpoint: "products/1/basic",
						fieldType: {
							id: "vBasic"
						}
					},
					{
						id: "content",
						label: "Content",
						status: "danger",
						endpoint: "products/1/content",
						fieldType: {
							id: "vContent"
						}
					},
					{
						id: "models",
						label: "Models",
						endpoint: "products/1/models",
						fieldType: {
							id: "vModels"
						}
					},
					{
						id: "accessibility",
						label: "Accessibility",
						endpoint: "products/1/access",
						fieldType: {
							id: "vAccess"
						}
					},
					{
						id: "files",
						label: "Files",
						endpoint: "products/1/files",
						fieldType: {
							id: "vFiles"
						}
					},
					{
						id: "variations",
						label: "Variations",
						endpoint: "products/1/variations",
						fieldType: {
							id: "vVariations"
						}
					}
				]
			}
		}
	},
	created() {
		this.getData();
	}
};
</script>

<style lang="scss" scoped>
.product {
	.header {

	}

	.main {

	}
}
</style>
