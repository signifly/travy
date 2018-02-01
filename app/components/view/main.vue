<template>
	<div class="view-main" v-if="definitions">
		<div class="header">
			header
		</div>

		<div class="main">
			<Row>
				<Col :span="16">
					<tabs v-bind="{tabs, data}" @fieldA="fieldA"/>
				</Col>
				<Col :span="8">
					right
				</Col>
			</Row>
		</div>
	</div>
</template>

<script>
import {mapValues, forEach, set} from "lodash";
import {Row, Col} from "element-ui";
import {tabs} from "./components";

export default {
	components: {Row, Col, tabs},
	props: {
		id: {type: String, required: true},
		meta: {type: Object, required: true}
	},
	data() {
		return {
			definitions: null,
			data: null
		}
	},
	computed: {
		tabs: (t) => t.definitions.tabs
	},
	methods: {
		fieldA({action, data}) {
			this[action]({data});
		},
		update({data}) {
			forEach(data, (val, key) => set(this.data, key, val));
		},
		async getDefinitions() {
			this.definitions = {
				tabs: [
					{
						id: "basic",
						label: "Basic",
						title: "Basic",
						sections: [
							{
								id: "wfewf",
								title: "wfewf",
								fields: [
									{
										name: "seatWidth",
										label: "Seat width",
										tooltip: "do something",
										fieldType: {
											id: "vInputNumber",
											readonly: true,
											unit: "cm",
											props: {
												value: "s1"
											}
										}
									},
									{
										name: "seatWidth2",
										label: "Seat width2",
										fieldType: {
											id: "vInputNumber",
											unit: "cm",
											props: {
												value: "s2"
											}
										}
									}
								]
							},
							{
								id: "wfdsfsdf",
								title: "wfdsfsdf",
								fields: [
									{
										name: "seatWidth",
										label: "Seat width",
										tooltip: "do something",
										fieldType: {
											id: "vInputNumber",
											readonly: true,
											unit: "cm",
											reference: "earg iaeorjg ioerg jeopig jesrgo ipjseg sepog ijesr pogiserj goesrijg seroi gjserop gijser goiesrj geosrig jseiog j.",
											props: {
												value: "s3"
											}
										}
									},
									{
										name: "seatWidtsh2",
										label: "Seat widt32",
										fieldType: {
											id: "vInputNumber",
											props: {
												value: "s4"
											}
										}
									},
									{
										name: "seatWidath2",
										label: "Seat width2",
										fieldType: {
											id: "vInputNumber",
											unit: "cm",
											props: {
												value: "s5"
											}
										}
									},
									{
										name: "seatWidAth2",
										label: "Seat width2",
										fieldType: {
											id: "vInputNumber",
											unit: "cm",
											props: {
												value: "s6"
											}
										}
									}
								]
							}
						]
					},
					{
						id: "content",
						label: "Content",
						title: "Content",
						sections: [
							{
								id: "product_description",
								title: "Product description",
								fields: [
									{
										name: "product_description",
										label: "Product description",
										fieldType: {
											id: "vEditor",
											readonly: false,
											props: {
												content: "markdown"
											}
										}
									}
								]
							},
							{
								id: "classification",
								title: "Classification",
								fields: [
									{
										name: "tags",
										label: "Tags",
										fieldType: {
											id: "vSelectTagsMultiAdd",
											props: {
												options: "tagsOptions",
												value: "tagsValue"
											}
										}
									},
									{
										name: "collections",
										label: "Collections",
										fieldType: {
											id: "vSelectTagsMulti",
											props: {
												options: "tagsOptions2",
												value: "tagsValue2"
											}
										}
									},
								]
							},
							{
								id: "media_url",
								title: "Media URL",
								fields: [
									{
										name: "url",
										label: "URL",
										fieldType: {
											id: "vInput",
											props: {
												value: "url"
											}
										}
									}
								]
							}
						]
					},
					{
						id: "models",
						label: "Models",
						title: "Models",
						sections: [
							{
								id: "models",
								title: "Models",
								draggable: "lines",
								field: {
									name: "dfsffd",
									label: "sefesf",
									fieldType: {
										id: "vLine",
										readonly: false,
										props: {
											switchValue: "switchValue",
											switchTitle: "switchTitle",
											info: "info",
											actions: "actions"
										}
									}
								}
							}
						]
					},
					{
						id: "access",
						label: "Accessibility",
						title: "Accessibility",
						sections: [
							{
								id: "t",
								title: "Table",
								fields: [
									{
										name: "dfsffd",
										label: "sefesf",
										fieldType: {
											id: "vTable",
											props: {
												columns: "dateTableColumns",
												columnsData: "dateTableData"
											}
										}
									}
								]
							}
						]
					}
				]
			};

			await this.getData();
		},
		async getData() {
			this.data = {
				s1: 60,
				s2: null,
				s3: 50,
				s4: 40,
				s5: 30,
				s6: 20,
				s7: 20,
				s8: 20,
				markdown: "",
				tagsValue: ["testing"],
				tagsOptions: [
					{
						label: "A",
						value: "a",
						disabled: false
					},
					{
						label: "B",
						value: "b",
						disabled: false
					},
					{
						label: "C",
						value: "c",
						disabled: true
					}
				],
				tagsValue2: ["testinger"],
				tagsOptions2: [
					{
						label: "A",
						value: "a",
						disabled: false
					},
					{
						label: "B",
						value: "b",
						disabled: false
					},
					{
						label: "C",
						value: "c",
						disabled: true
					}
				],
				url: "",
				lines: [
					{
						id: 1,
						switchValue: true,
						switchTitle: "toggle",
						info: [
							{
								title: "Model",
								value: "111modalbreeze",
								tooltip: "111just a tooltip"
							},
							{
								title: "Variants",
								value: "Breeze ewfffwefew",
								tooltip: "1111just a tooltip"
							}
						],
						actions: [
							{
								title: "Delete",
								type: "delete",
								description: "Do you wanna delete this product?"
							},
							{
								title: "View",
								type: "show"
							}
						]
					},
					{
						id: 2,
						switchValue: false,
						switchTitle: "toggle",
						info: [
							{
								title: "Model",
								value: "222modalbreeze",
								tooltip: "just a tooltip"
							},
							{
								title: "Variants",
								value: "222Breeze sto",
								tooltip: "just a tooltip"
							}
						],
						actions: [
							{
								title: "Delete",
								type: "delete",
								description: "Do you wanna delete this product?"
							},
							{
								title: "View",
								type: "show"
							}
						]
					}
				],
				dateTableColumns: [
					{
						name: "title",
						label: "Title",
						fieldType: {
							id: "vText",
							props: {
								text: "title"
							}
						}
					},
					{
						name: "access",
						label: "Access",
						fieldType: {
							id: "vDateRange",
							props: {
								dates: "dates1",
							}
						}
					},
					{
						name: "salad",
						label: "Salad",
						fieldType: {
							id: "vDateRange",
							props: {
								dates: "dates2",
							}
						}
					}
				],
				dateTableData: [
					{
						id: 0,
						title: "sfef",
						statustext: "spflwe",
						status: "warning",
						dates1: ["02-10-2012", "02-10-2014"],
						dates2: ["02-10-2012", "02-10-2014"]
					},
					{
						id: 1,
						title: "spflsefs",
						statustext: "spfasacacs",
						status: "primary",
						dates1: ["2012-10-02", "2014-10-02"],
						dates2: ["02-10-2012", "02-10-2014"]
					}
				]
			};
		}
	},
	created() {
		this.getDefinitions();
	}
};
</script>

<style lang="scss" scoped>
.view-main {

}
</style>
