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
						endpoint: "products/1/basic",
						fieldType: {
							id: "vBasic"
						}
					},
					{
						id: "content",
						label: "Content",
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
		.tabs {
			/deep/ {
				.el-tabs__header {
					margin: 0;
				}
				.el-tabs__nav {
					overflow: hidden;
				}
				.el-tabs__item {
					font-weight: 400;
					color: $blue4;
					background-color: $white1;
					border-bottom: 1px solid #e4e7ed;

					&.is-active {
						border-bottom-color: $white1;
						color: $blue5;
					}
				}
				.el-tabs__content {
					background-color: $white1;
					border: 1px solid #e4e7ed;
					border-radius: 4px;
					border-top-left-radius: 0;
					margin-top: -1px;
					padding: 1.5em;
				}
			}
		}
	}
}
</style>
