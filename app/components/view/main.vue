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
						label: "Basic",
						title: "Basic",
						sections: [
							{
								title: "Basic",
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
												value: "seat_width"
											}
										}
									},
									{
										name: "seatWidth2",
										label: "Seat width2",
										fieldType: {
											id: "vInputNumber",
											readonly: true,
											unit: "cm",
											props: {
												value: "seat_width2"
											}
										}
									}
								]
							}
						]
					},
					{
						label: "Content",
						title: "Content",
						sections: [
							{
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
												value: "seat_width"
											}
										}
									},
									{
										name: "seatWidth2",
										label: "Seat width2",
										fieldType: {
											id: "vInputNumber",
											readonly: true,
											unit: "cm",
											props: {
												value: "seat_width2"
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
				seat_width: 60,
				seat_width2: 60
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
