<template>
	<div class="view-page" v-if="data">
		<hero v-bind="{modifiers, hero, data}" @refresh="$emit('refresh')">
			<template v-slot:settings>
				<actions v-if="actions" v-bind="{actions, data}" @event="event" />
			</template>
		</hero>

		<div class="container" :key="refreshKey">
			<Row class="mid" :gutter="20">
				<Col class="left" :span="16">
					<tabs
						v-bind="{tabs, data: res.data}"
						:edit.sync="edits.tabs"
						@event="event"
						ref="tabs"
					/>
				</Col>
				<Col class="right" :span="8">
					<sidebar
						v-bind="{sidebar, url, options}"
						:edit.sync="edits.sidebar"
						:data.sync="res.data"
						@event="event"
						v-if="sidebar"
						ref="sidebar"
					/>
				</Col>
			</Row>

			<Row class="bottom" :gutter="20">
				<Col class="left" :span="24">
					<transition name="el-fade-in" mode="out-in" appear>
						<activity
							v-bind="{activity, data, url}"
							v-if="activity"
							@event="event"
						/>
					</transition>
				</Col>
			</Row>

			<panels v-bind="{loading, error, data, edits}" @save="save" />
		</div>
	</div>
</template>

<script>
import actions from "@/components/page-actions";
import activity from "./components/activity";
import {transProps} from "@/modules/utils";
import sidebar from "./components/sidebar";
import panels from "./components/panels";
import tabs from "@/components/tabs";
import hero from "@/components/hero";
import {Row, Col} from "element-ui";
import {merge} from "lodash";

export default {
	components: {
		activity,
		actions,
		sidebar,
		panels,
		tabs,
		hero,
		Col,
		Row
	},
	props: {
		modifiers: {type: Object, required: false},
		pageTitle: {type: String, required: true},
		activity: {type: Object, required: false},
		sidebar: {type: Object, required: false},
		actions: {type: Array, required: false},
		hero: {type: Object, required: true},
		tabs: {type: Array, required: true},
		url: {type: String, required: true}
	},
	data() {
		return {
			loading: false,
			refreshKey: 0,
			error: null,
			edits: {},
			res: {
				data: null,
				options: null
			}
		};
	},
	computed: {
		options: (t) => t.res.options,
		query: (t) => t.$route.query,
		data: (t) => t.res.data
	},
	methods: {
		async event({actions = {}, done}) {
			if (actions.refresh) {
				await this.getData();
				this.refreshKey++;
			}

			if (done) done();
		},

		async save({done} = {}) {
			this.loading = true;

			try {
				const [sidebar, tabs] = await Promise.all([
					this.sidebar && this.$refs.sidebar.save(),
					this.$refs.tabs.save()
				]);

				const event = merge(sidebar, tabs);
				await this.event(event);
				if (done) done();

				this.error = null;
				this.edits = {};
			} catch (err) {
				this.error = err;
			}

			this.loading = false;
		},

		async getData() {
			const params = {modifier: this.query.modifiers};

			try {
				const {data} = await this.$axios.get(this.url, {
					customErr: true,
					params
				});

				this.$store.dispatch("base/meta", {
					title: transProps({data: data.data, val: this.pageTitle})
				});

				this.res = data;
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
		this.getData();
	}
};
</script>

<style lang="scss" scoped>
.view-page {
	margin-bottom: 4em;
}
</style>
