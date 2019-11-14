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
						v-bind="{sidebar, endpoint, options}"
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
							v-bind="{data, endpoint}"
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
		tabs: {type: Array, required: true},
		hero: {type: Object, required: true},
		actions: {type: Array, required: true},
		sidebar: {type: Object, required: true},
		activity: {type: Object, required: true},
		endpoint: {type: Object, required: true},
		modifiers: {type: Object, required: false}
	},
	data() {
		return {
			loading: false,
			error: null,
			update: 0,
			edits: {},
			res: {
				data: null,
				options: null
			}
		};
	},
	computed: {
		data: (t) => t.res.data,
		query: (t) => t.$route.query,
		options: (t) => t.res.options
	},
	methods: {
		refresh() {
			this.$emit("refresh");
		},

		async event({actions = {}, done}) {
			if (actions.refresh) {
				await this.getData();
				this.update++;
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
			const {tableId, viewId} = this.$route.params;

			try {
				const {data} = await this.$axios.get(`/${tableId}/${viewId}`, {
					customErr: true,
					params
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
