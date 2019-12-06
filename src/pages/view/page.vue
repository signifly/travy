<template>
	<div class="view-page" v-if="data">
		<hero v-bind="{modifiers, hero, data}" @refresh="refresh">
			<template v-slot:settings>
				<actions v-if="actions" v-bind="{actions, data}" @event="event" />
			</template>
		</hero>

		<div class="container">
			<Row class="mid" :gutter="20">
				<Col class="left" :span="16">
					<tabs
						ref="tabs"
						v-bind="{tabs, data: res.data}"
						:edit.sync="edits.tabs"
						@event="event"
					/>
				</Col>
				<Col class="right" :span="8">
					<sidebar
						v-if="sidebar"
						ref="sidebar"
						v-bind="{sidebar, url, options}"
						:edit.sync="edits.sidebar"
						:data.sync="res.data"
						@event="event"
					/>
				</Col>
			</Row>

			<Row class="bottom" :gutter="20">
				<Col class="left" :span="24">
					<transition name="el-fade-in" mode="out-in" appear>
						<activity
							v-if="activity"
							:key="data.updated_at"
							v-bind="{data, url}"
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
import {rStringProps} from "@/modules/utils";
import activity from "./components/activity";
import sidebar from "./components/sidebar";
import panels from "./components/panels";
import tabs from "@/components/tabs";
import hero from "@/components/hero";
import {Row, Col} from "element-ui";
import {merge} from "lodash";

export default {
	components: {
		Col,
		Row,
		hero,
		tabs,
		panels,
		sidebar,
		actions,
		activity
	},
	props: {
		modifiers: {type: Object, required: false},
		pageTitle: {type: String, required: true},
		activity: {type: Object, required: false},
		sidebar: {type: Object, required: true},
		actions: {type: Array, required: false},
		hero: {type: Object, required: true},
		tabs: {type: Array, required: true},
		url: {type: String, required: true}
	},
	data() {
		return {
			loading: false,
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
		refresh() {
			this.$emit("refresh");
		},

		async event({actions = {}, done}) {
			if (actions.refresh) {
				await this.getData();
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
					title: rStringProps({data: data.data, val: this.pageTitle})
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
