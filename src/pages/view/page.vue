<template>
	<transition name="view-page" v-if="data">
		<div class="view-page">

			<Row class="top" :gutter="20">
				<Col class="left" :span="16">
					<vHeader v-bind="{data, header}"/>
				</Col>
				<Col class="right" :span="8">
					<modifiers v-if="modifiers" v-bind="modifiers" @refresh="refresh"/>
					<actions v-if="actions" v-bind="{actions, data}" @submit="getData"/>
				</Col>
			</Row>

			<Row class="mid" :gutter="20">
				<Col class="left" :span="16">
					<tabs ref="tabs" v-bind="{tabs, data, options}" @edit="edit = $event"/>
				</Col>
				<Col class="right" :span="8">
					<sidebar v-if="sidebar" v-bind="{sidebar, data}"/>
				</Col>
			</Row>

			<Row class="bottom" :gutter="20">
				<Col class="left" :span="24">
					<activity v-if="activity" v-bind="{data, endpoint}"/>
				</Col>
			</Row>

			<panels v-bind="{loading, data, edit}" @save="save" @refreshData="refreshData"/>
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
import modifiers from "@/components/modifiers";

export default {
	components: {Col, Row, tabs, panels, vHeader, sidebar, actions, activity, modifiers},
	props: {
		requests: {type: Object, required: true}
	},
	data() {
		return {
			definitions: null,
			options: null,
			data: null,
			edit: false,
			loading: false
		}
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
		async refresh({done} = {}) {
			await this.getDefinitions();
			await this.getData();
			if (done) await done();
		},

		async refreshData({done} = {}) {
			await this.getData();
			if (done) await done();
		},

		async save({done} = {}) {
			this.loading = true;
			await this.$refs.tabs.save();
			if (done) await done();
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
				const {data: {data, options}} = await this.$axios.get(this.requests.data, {params, customErr: true});
				this.options = options;
				this.data = data;

			} catch(err) {
				if (err.status === 404) {
					this.$router.replace({name: "error", params: {status: 404}});
				} else {
					throw err;
				}
			}
		}
	},
	created() {
		this.refresh();
	}
};
</script>

<style lang="scss" scoped>
.view-page {
	margin-top: 2em;

	&-enter-active, &-leave-active {
		transition: cubic(opacity, 0.3s);
		transition-delay: 0.1s;
	}

	&-enter, &-leave-to {
		opacity: 0;
	}
}
</style>
