<template>
	<div class="view-main" v-if="data">
		<div class="main">
			<Row class="top" :gutter="20">
				<Col class="left" :span="16">
					<vHeader v-bind="{data, header}" @fieldA="fieldA" />
				</Col>
				<Col class="right" :span="8">
					<vModifiers v-bind="{modifiers}" @getData="getData" />
					<vActions v-bind="{actions, endpoints, data}" @submit="getData" />
				</Col>
			</Row>

			<Row class="mid" :gutter="20">
				<Col class="left" :span="16">
					<vTabs v-bind="{tabs, data, edits, errors}" @fieldA="fieldA"/>
				</Col>
				<Col class="right" :span="8">
					<vSidebar v-bind="{sidebar, data}" @fieldA="fieldA" />
				</Col>
			</Row>

			<Row class="bottom" :gutter="20">
				<Col class="left" :span="24">
					<vActivity v-if="activity.active" v-bind="{endpoints, data}" :key="saveU" />
				</Col>
			</Row>
		</div>

		<vPanel v-bind="{id, loading, edited, getData, error}" title="some product, thingy" @save="save" />
	</div>
</template>

<script>
import {mapValues, forEach, set, get} from "lodash";
import {endpointUrl} from "@/modules/utils";
import {Row, Col} from "element-ui";
import * as components from "./components";
import vModifiers from "@/components/modifiers.vue";

const edits = () => ({tabs: new Set(), data: new Set()});

export default {
	components: {Row, Col, vModifiers, ...components},
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
			edits: edits(),
			editsU: 0,
			saveU: 0
		}
	},
	computed: {
		query: (t) => t.$route.query,
		endpoints: (t) => t.definitions.endpoints,
		header: (t) => t.definitions.header,
		sidebar: (t) => t.definitions.sidebar,
		modifiers: (t) => t.definitions.modifiers,
		activity: (t) => t.definitions.activity,
		actions: (t) => t.definitions.actions,
		tabs: (t) => t.definitions.tabs,
		parentId: (t) => t.$route.meta.id,
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

		modifierParams({definitions} = {}) {
			if (this.query.modifiers || definitions) return this.query.modifiers;

			return this.modifiers.reduce((obj, item) => {
				return {...obj, [item.key]: item.value};
			}, {});
		},

		async getDefinitions() {
			const params = {
				modifiers: this.modifierParams({definitions: true})
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
				modifiers: this.modifierParams()
			};

			if (this.parentId === "test") {
				const {data} = await this.$http.get("https://sikaline.glitch.me/view-data/products");
				this.data = data;
			} else {
				const {data} = await this.$http.get(`${this.parentId}/${this.id}`, {params});
				this.data = data.data;
			}
		},

		async save({done} = {}) {
			const url = endpointUrl({data: this.data, url: this.endpoints.update.url});

			try {
				this.loading = true;
				const modifiers = this.modifierParams();

				const {data} = await this.$http.put(url, {data: this.dataUpdated, modifiers}, {custom: true});
				this.data = data.data;

				// reset edits
				this.edits = edits();
				this.editsU = 0;

				// reset errors
				this.error = {};

				this.saveU++;

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
