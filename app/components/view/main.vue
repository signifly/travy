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
import {mapValues} from "lodash";
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
			this.data = {...this.data, ...data};
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
											unit: "cm",
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
								id: "basic",
								title: "Basic",
								fields: [
									{
										name: "seatWidth",
										label: "Seat width",
										fieldType: {
											id: "vInputNumber",
											readonly: true,
											unit: "cm",
											props: {
												value: "s7"
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
				s8: 20
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
