<template>
	<div class="view-main" v-if="definitions">
		<div class="header">
			header
		</div>

		<div class="main">
			<Row>
				<Col :span="16">
					<tabs v-bind="{tabs, data}" @update="update"/>
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
									},
									{
										name: "seatWidth2",
										label: "Seat width2",
										fieldType: {
											id: "vInputNumber",
											unit: "cm",
											props: {
												value: "s8"
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
								draggable: "images",
								fields: [
									{
										name: "dfsffd",
										label: "sefesf",
										fieldType: {
											id: "vInputNumber",
											readonly: false,
											props: {
												order: "images[0].order",
												value: "images[0].value"
											}
										}
									},
									{
										name: "awfawef",
										label: "sefsef",
										fieldType: {
											id: "vInputNumber",
											readonly: false,
											props: {
												order: "images[1].order",
												value: "images[1].value"
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
				images: [
					{
						title: "111",
						order: 0,
						value: 0
					},
					{
						title: "222",
						order: 1,
						value: 222
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
