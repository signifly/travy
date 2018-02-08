<template>
	<div class="view-main" v-if="data">
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

		remove({data}) {
			console.log("remove", data);
		},
		async getDefinitions() {
			const {data} = await this.$http.get("https://sikaline.glitch.me/view-defs/products");
			this.definitions = data;
			await this.getData();
		},
		async getData() {
			const {data} = await this.$http.get("https://sikaline.glitch.me/view-data/products");
			this.data = data;
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
