<template>
	<div class="view-main" v-if="data">
		<div class="header">
			header
		</div>

		<div class="main">
			<Row>
				<Col :span="16">
					<vTabs v-bind="{tabs, data, edits, errors, dataU}" @fieldA="fieldA"/>
				</Col>
				<Col :span="8">
					right
				</Col>
			</Row>
		</div>

		<vPanel v-bind="{id, loading, edited, getData}" title="some product, thingy" @save="save" />
	</div>
</template>

<script>
import {mapValues, forEach, set, get} from "lodash";
import {Row, Col} from "element-ui";
import {vTabs, vPanel} from "./components";

const edits = () => ({tabs: new Set(), data: new Set()});

export default {
	components: {Row, Col, vTabs, vPanel},
	props: {
		id: {type: String, required: true},
		meta: {type: Object, required: true}
	},
	data() {
		return {
			error: {},
			loading: false,
			definitions: null,
			data: null,
			dataU: 0,
			edits: edits(),
			editsU: 0
		}
	},
	computed: {
		endpoint: (t) => `${t.$route.meta.parent.id}/${t.id}`,
		errors: (t) => t.error.errors,
		tabs: (t) => t.definitions.tabs,
		edited: (t) => t.editsU > 0,
		dataUpdated() {
			const editsU = this.editsU; // force update, because sets are not reactive

			return [...this.edits.data].reduce((sum, key) => {
				key = key.split(".")[0].split("[")[0]; // use the root key to update the field if it's nested

				sum[key] = get(this.data, key);
				return sum;
			}, {});
		}
	},
	methods: {
		fieldA({action, tab, data}) {
			this.track({tab, data});
			if (this[action]) this[action]({data});
		},

		track({tab, data}) { // track tab and data edits
			const edits = {...this.edits};
			edits.tabs.add(tab);
			Object.keys(data).forEach(key => edits.data.add(key));
			this.edits = edits;
			this.editsU++;
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
			this.dataU++;
		},

		async save({done} = {}) {
			try {
				this.loading = true;
				await this.$http.put(this.endpoint, this.dataUpdated);

				// reset edits
				this.edits = edits();
				this.editsU = 0;

				if (done) await done();

			} catch ({response}) {
				this.error = response.data;
			} finally {
				this.loading = false;
			}
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
