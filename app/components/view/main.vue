<template>
	<div class="view-main" v-if="data">
		<div class="main">
			<Row class="top" :gutter="20">
				<Col class="left" :span="16">
					<vHeader v-bind="{data, header}" />
				</Col>
				<Col class="right" :span="8">
					<vModifiers v-bind="{modifiers}" @getData="getData" />
					<vActions v-bind="{actions, endpoints}" />
				</Col>
			</Row>

			<Row class="mid" :gutter="20">
				<Col class="left" :span="16">
					<vTabs v-bind="{tabs, data, edits, errors, dataU}" @fieldA="fieldA"/>
				</Col>
				<Col class="right" :span="8">
					<vSidebar v-bind="{sidebar, data}" @fieldA="fieldA" />
				</Col>
			</Row>

		</div>

		<vPanel v-bind="{id, loading, edited, getData, error}" title="some product, thingy" @save="save" />
	</div>
</template>

<script>
import {mapValues, forEach, set, get} from "lodash";
import {endpoint} from "@/modules/utils";
import {Row, Col} from "element-ui";
import {vHeader, vSidebar, vTabs, vPanel} from "./components";
import vModifiers from "@/components/modifiers.vue";
import vActions from "@/components/actions/index.vue";

const edits = () => ({tabs: new Set(), data: new Set()});

export default {
	components: {Row, Col, vHeader, vSidebar, vTabs, vPanel, vModifiers, vActions},
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
		query: (t) => t.$route.query,
		endpoints: (t) => t.definitions.endpoints,
		header: (t) => t.definitions.header,
		sidebar: (t) => t.definitions.sidebar,
		modifiers: (t) => t.definitions.modifiers,
		actions: (t) => t.definitions.actions,
		tabs: (t) => t.definitions.tabs,
		parentId: (t) => t.$route.meta.parent.id,
		errors: (t) => t.error.errors,
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
			if (this[action]) this[action]({tab, data});
		},

		track({tab, data}) { // track tab and data updates
			const edits = {...this.edits};
			edits.tabs.add(tab);
			Object.keys(data).forEach(key => edits.data.add(key));
			this.edits = edits;
			this.editsU++;
		},

		endpoint({type}) {
			return endpoint({type, item: this.data, endpoints: this.endpoints});
		},

		update({tab, data}) {
			this.track({tab, data});
			forEach(data, (val, key) => set(this.data, key, val));
		},

		remove({data}) {
			console.log("remove", data);
		},

		async getDefinitions() {
			const params = {
				modifier: this.query.modifiers
			};

			if (this.parentId === "test") {
				const {data} = await this.$http.get("https://sikaline.glitch.me/view-defs/products");
				this.definitions = data;
			} else {
				const {data} = await this.$http.get(`definitions/view/${this.parentId}`, {params});
				this.definitions = data;
			}
		},

		async getData({type} = {}) {
			if (type === "modifiers") await this.getDefinitions();

			const params = {
				modifier: this.query.modifiers
			};

			if (this.parentId === "test") {
				const {data} = await this.$http.get("https://sikaline.glitch.me/view-data/products");
				this.data = data;
			} else {
				const {data} = await this.$http.get(`${this.parentId}/${this.id}`, {params});
				this.data = data.data;
			}

			this.dataU++;
		},

		async save({done} = {}) {
			try {
				this.loading = true;
				const {data} = await this.$http.put(this.endpoint({type: "update"}), {data: this.dataUpdated}, {custom: true});
				this.data = data.data;

				// reset edits
				this.edits = edits();
				this.editsU = 0;

				// reset errors
				this.error = {};

				if (done) await done();

			} catch ({response}) {
				this.error = get(response, "data", {});
			} finally {
				this.loading = false;
			}
		}
	},
	async created() {
		await this.getDefinitions();
		await this.getData();
	}
};
</script>

<style lang="scss" scoped>
.view-main {
	.main {
		.top {
			.right {
				/deep/ {
					.modifiers {
						justify-content: flex-end;
					}
					.actions {
						display: flex;
						justify-content: flex-end;
						margin: 1.5em 0;
					}
				}
			}
		}
	}
}
</style>
