<template>
	<div class="tabs">
		<Tabs type="card" v-model="activeTab">
			<TabPane
				v-for="tab in tabs"
				:name="tab.id"
				:key="tab.id"
				:lazy="true"
				ref="tab"
			>
				<tabLabel slot="label" v-bind="tab" :state="state[tab.id]" />

				<tabContent
					ref="tabContent"
					:key="update"
					v-bind="{tab, data}"
					:state.sync="state[tab.id]"
					@event="$emit('event', $event)"
				/>
			</TabPane>
		</Tabs>
	</div>
</template>

<script>
import {Tabs, TabPane} from "element-ui";
import tabContent from "./tab/content";
import tabLabel from "./tab/label";
import {merge} from "lodash";

export default {
	components: {Tabs, TabPane, tabContent, tabLabel},
	props: {
		tabs: {type: Array, required: true},
		data: {type: Object, required: true},
		update: {type: Number, required: true}
	},
	data() {
		return {
			activeTab: this.$route.params.tabId || this.tabs[0].id,
			state: this.createState()
		};
	},
	computed: {
		edits: (t) => Object.values(t.state).some((val) => val.edit)
	},
	methods: {
		createState() {
			return this.tabs.reduce((obj, {id}) => ({...obj, [id]: {}}), {});
		},

		async save() {
			const tabs = this.$refs.tabContent;
			const res = await Promise.all(tabs.map((x) => x.save()));
			return res.reduce((sum, x) => merge(sum, x), {});
		}
	},
	watch: {
		activeTab(tabId) {
			this.$router.replace({...this.$route, params: {tabId}});
		},
		edits(edits) {
			this.$emit("update:edit", edits);
		},
		update() {
			// unload non active tabs on updates so they don't all get data at once.
			this.$refs.tab
				.filter((x) => !x.active)
				.forEach((x) => {
					x.loaded = false;
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.tabs {
	::v-deep {
		.el-tabs__header {
			display: flex;
			margin: 0;

			.el-tabs__item {
				user-select: none;
				color: $blue4;
				font-weight: 400;
				background-color: $white1;
				border-bottom: 1px solid #e4e7ed;

				&.is-active {
					border-bottom-color: $white1;
					color: $blue5;
				}
			}
		}

		.el-tabs__content {
			background-color: $white1;
			border: 1px solid #e4e7ed;
			border-radius: 4px;
			border-top-left-radius: 0;
			margin-top: -1px;
			padding: 1.5em;
			overflow: visible;
		}
	}
}
</style>
