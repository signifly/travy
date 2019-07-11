<template>
	<transition name="view-page" v-if="definitions && data">
		<div class="view-page">
			<Row class="top" :gutter="20">
				<Col class="left" :span="12">
					<vHeader v-bind="{data, header}" />
				</Col>
				<Col class="right" :span="12">
					<modifiers v-if="modifiers" v-bind="{modifiers}" @event="event" />
					<actions v-if="actions" v-bind="{actions, data}" @event="event" />
				</Col>
			</Row>

			<Row class="mid" :gutter="20">
				<Col class="left" :span="16">
					<tabs
						ref="tabs"
						v-bind="{tabs, data, updateKey}"
						@edit="setEdit('tabs', $event)"
						@event="event"
					/>
				</Col>
				<Col class="right" :span="8">
					<sidebar
						v-if="sidebar"
						ref="sidebar"
						v-bind="{sidebar, endpoint}"
						:state.sync="state"
						@event="event"
					/>
				</Col>
			</Row>

			<Row class="bottom" :gutter="20">
				<Col class="left" :span="24">
					<activity
						v-if="activity"
						:key="data.updated_at"
						v-bind="{data, endpoint}"
						@event="event"
					/>
				</Col>
			</Row>

			<panels v-bind="{loading, error, data, edits}" @save="save" />
		</div>
	</transition>
</template>

<script>
import {merge} from "lodash";
import {Row, Col} from "element-ui";
import tabs from "./components/tabs";
import panels from "./components/panels";
import vHeader from "./components/header";
import sidebar from "./components/sidebar";
import actions from "./components/actions";
import activity from "./components/activity";
import modifiers from "./components/modifiers";

export default {
	components: {
		Col,
		Row,
		tabs,
		panels,
		vHeader,
		sidebar,
		actions,
		activity,
		modifiers
	},
	props: {
		requests: {type: Object, required: true}
	},
	data() {
		return {
			definitions: null,
			loading: false,
			updateKey: 0,
			state: {
				edits: {},
				data: null,
				error: null,
				options: null
			}
		};
	},
	computed: {
		data: (t) => t.state.data,
		edits: (t) => t.state.edits,
		error: (t) => t.state.error,
		query: (t) => t.$route.query,
		tabs: (t) => t.definitions.tabs,
		header: (t) => t.definitions.header,
		actions: (t) => t.definitions.actions,
		sidebar: (t) => t.definitions.sidebar,
		activity: (t) => t.definitions.activity,
		endpoint: (t) => t.definitions.endpoint,
		modifiers: (t) => t.definitions.modifiers
	},
	methods: {
		setEdit(key, val) {
			this.state.edits = {...this.edits, [key]: val};
		},
		async event({actions, done}) {
			if (actions.refresh) {
				const {definitions, data} = actions.refresh;
				if (definitions) await this.getDefinitions();
				if (data) await this.getData();
				this.updateKey++;
			}

			if (done) await done();
		},

		async save({done} = {}) {
			this.loading = true;

			try {
				const [sidebar, tabs] = await Promise.all([
					this.sidebar && this.$refs.sidebar.save(),
					this.$refs.tabs.save()
				]);

				const actions = merge(sidebar, tabs);
				await this.event({actions, done});
				this.state.error = null;
				this.state.edits = {};
			} catch (err) {
				this.state.error = err;
			}

			this.loading = false;
		},

		async getDefinitions() {
			const params = {modifier: this.query.modifiers};
			const {data} = await this.$axios.get(this.requests.definitions, {params});
			this.definitions = data;
		},

		async getData() {
			const params = {modifier: this.query.modifiers};

			try {
				const {data} = await this.$axios.get(this.requests.data, {
					params,
					customErr: true
				});

				this.state.data = data.data;
				this.state.options = data.options;
			} catch (err) {
				if (err.status === 404) {
					this.$router.replace({name: "error", params: {status: 404}});
				} else {
					throw err;
				}
			}
		}
	},
	created() {
		this.getDefinitions();
		this.getData();
	}
};
</script>

<style lang="scss" scoped>
.view-page {
	margin-top: 2em;

	&-enter-active,
	&-leave-active {
		transition: cubic(opacity, 0.3s);
		transition-delay: 0.1s;
	}

	&-enter,
	&-leave-to {
		opacity: 0;
	}

	.top {
		.right {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
		}
	}
}
</style>
