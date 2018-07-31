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
						<vModifiers v-if="modifiers" v-bind="{modifiers}" @refreshAll="refreshAll" />
						<vActions v-if="actions" v-bind="{actions, data}" @submit="getData" />
					</Col>
				</Row>

				<Row class="mid" :gutter="20">
					<Col class="left" :span="16">
						<vTabs v-bind="{tabs, data, dataU, options, edits, errors}" @fieldA="fieldA"/>
					</Col>
					<Col class="right" :span="8">
						<vSidebar v-if="sidebar" v-bind="{sidebar, data}" @fieldA="fieldA" />
					</Col>
				</Row>

				<Row class="bottom" :gutter="20">
					<Col class="left" :span="24">
						<vActivity v-if="activity" v-bind="{data}" :key="saveU" />
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
		requests: {type: Object, required: true}
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
		tabs: (t) => t.definitions.tabs, // required
		header: (t) => t.definitions.header, // required
		endpoint: (t) => t.definitions.endpoint, // required
		sidebar: (t) => t.definitions.sidebar,
		modifiers: (t) => t.definitions.modifiers,
		activity: (t) => t.definitions.activity,
		actions: (t) => t.definitions.actions,
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
			const actions = {
				refresh: async ({done}) => {
					await this.getData();
					if (done) await done();
				},

				update: async ({tab, data}) => {
					this.track({tab, data});
					forEach(data, (val, key) => set(this.data, key, val));
				}
			};

			if (actions[action]) {
				actions[action]({tab, data, done});
			}
		},

		async refreshAll({done}) {
			await this.getDefinitions();
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

		modifierParams({definitions} = {}) {
			if (this.query.modifiers || definitions) {
				return this.query.modifiers;
			}

			if (this.modifiers) {
				return this.modifiers.reduce((obj, item) => {
					return {...obj, [item.key]: item.value};
				}, {});
			}
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

			const {data} = await this.$http.get(this.requests.definitions, {params});
			this.definitions = data;
		},

		async getData() {
			const params = {
				modifiers: this.modifierParams()
			};

			try {
				const {data: {data, options}} = await this.$http.get(this.requests.data, {params}, {custom: true});
				this.options = options;
				this.data = data;

				this.reset();
				this.dataU++;
			} catch (err) {
				if (get(err, "response.status") === 404) {
					this.$router.replace({name: "404"});
				} else {
					throw err;
				}
			}

		},

		async save({done} = {}) {
			const url = endpointUrl({data: this.data, url: this.endpoint.url});

			try {
				this.loadingSave = true;
				const modifiers = this.modifierParams();

				const {data: {data, options}} = await this.$http.put(url, {...this.dataUpdated, modifiers}, {custom: true});
				this.options = options;
				this.data = data;

				this.reset();
				this.saveU++;

				if (done) await done();

				// for account page
				this.$emit("save", {data: {...data}});

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
		} catch (err) {
			console.log(err);
		} finally {
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
