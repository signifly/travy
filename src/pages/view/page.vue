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
						:key="updateKey"
						v-bind="{tabs, data}"
						@edit="edit = $event"
						@event="event"
					/>
				</Col>
				<Col class="right" :span="8">
					<sidebar
						v-if="sidebar"
						ref="sidebar"
						:key="updateKey"
						v-bind="{sidebar, endpoint, data}"
						@edit="edit = $event"
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

			<panels v-bind="{loading, error, data, edit}" @save="save" />
		</div>
	</transition>
</template>

<script>
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
			error: "",
			data: null,
			edit: false,
			updateKey: 0,
			loading: false,
			definitions: null
		};
	},
	computed: {
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
				await Promise.all([
					this.sidebar && this.$refs.sidebar.save(),
					this.$refs.tabs.save()
				]);
				if (done) await done();
				this.error = "";
			} catch (err) {
				this.error = err;
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
				const {
					data: {data}
				} = await this.$axios.get(this.requests.data, {
					params,
					customErr: true
				});
				this.data = data;
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
