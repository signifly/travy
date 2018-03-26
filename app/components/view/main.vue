<template>
	<div class="view-main">

		<div class="loading" ref="loading" v-if="!data" />

		<transition name="main">
			<div class="main" v-if="data">
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
						<vTabs v-bind="{tabs, data, dataU, options, edits, errors}" @fieldA="fieldA"/>
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

				<vPanel v-bind="{loading: loadingSave, data, editsU, getData, error}" @save="save" />
			</div>
		</transition>
	</div>
</template>

<script>
import {mapValues, forEach, set, get} from "lodash";
import {endpointUrl} from "@/modules/utils";
import {Row, Col, Loading} from "element-ui";
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
			loadingSave: false,
			definitions: null,
			options: null,
			data: null,
			dataU: 0,
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
		fieldA({action, tab, data, done}) {
			if (this[action]) this[action]({tab, data, done});
		},

		async refresh({done}) {
			await this.getData();
			if (done) await done();
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

		reset() {
			// reset edits
			this.edits = edits();
			this.editsU = 0;

			// reset errors
			this.error = {};
		},

		async getDefinitions() {
			const params = {
				modifiers: this.modifierParams({definitions: true})
			};

			const {data} = await this.$http.get(`definitions/view/${this.parentId}`, {params});
			this.definitions = data;
		},

		async getData({type} = {}) {
			if (type === "modifiers") await this.getDefinitions();

			const params = {
				modifiers: this.modifierParams()
			};

			const {data} = await this.$http.get(`${this.parentId}/${this.id}`, {params});
			this.options = data.options;
			this.data = data.data;

			this.reset();
			this.dataU++;
		},

		async save({done} = {}) {
			const url = endpointUrl({data: this.data, url: this.endpoints.update.url});

			try {
				this.loadingSave = true;
				const modifiers = this.modifierParams();

				const {data} = await this.$http.put(url, {data: this.dataUpdated, modifiers}, {custom: true});
				this.options = data.options;
				this.data = data.data;

				this.reset();
				this.saveU++;

				if (done) await done();

			} catch (err) {
				console.log(err);
				this.error = get(err, "response.data", {});
			} finally {
				this.loadingSave = false;
			}
		}
	},
	async created() {
		const load = Loading.service({
			target: this.$refs.loading,
			spinner: "el-icon-loading",
			background: "transparent",
			text: "Loading"
		});

		try {
			await this.getDefinitions();
			await this.getData();
		} catch (err) {} finally {
			load.close();
		}
	}
};
</script>

<style lang="scss" scoped>
.view-main {
	.main {
		&-enter-active, &-leave-active {
			transition: cubic(opacity, 0.3s);
			transition-delay: 0.1s;
		}

		&-enter, &-leave-to {
			opacity: 0;
		}

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
