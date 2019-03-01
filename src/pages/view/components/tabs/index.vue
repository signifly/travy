<template>
	<div class="tabs">
		<Tabs type="card" v-model="activeTab">
			<TabPane v-for="tab in tabs" :name="tab.id" :key="tab.id" :lazy="true">
				<tabLabel slot="label" v-bind="tab" :state="state[tab.id]"/>
				<tabContent ref="tabContent" v-bind="{tab, data}" :state.sync="state[tab.id]"/>
			</TabPane>
		</Tabs>
	</div>
</template>

<script>
import {Tabs, TabPane} from "element-ui";
import tabContent from "./tab/content";
import tabLabel from "./tab/label";

export default {
	components: {Tabs, TabPane, tabContent, tabLabel},
	props: {
		tabs: {type: Array, required: true},
		data: {type: Object, required: true}
	},
	data() {
		return {
			activeTab: this.$route.params.tabId || this.tabs[0].id,
			state: this.tabs.reduce((obj, tab) => ({...obj, [tab.id]: {}}), {}) // {tabId: {}}
		}
	},
	computed: {
		edit: (t) => Object.values(t.state).some(val => val.edit)
	},
	methods: {
		async save() {
			const tabs = this.$refs.tabContent;

			for (const tab of tabs) {
				await tab.save();
			}
		}
	},
	watch: {
		activeTab(tabId) {
			this.$router.replace({...this.$route, params: {tabId}});
		},
		edit(edit) {
			this.$emit("edit", edit);
		}
	}
};
</script>

<style lang="scss" scoped>
.tabs {
	::v-deep{
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

		.el-tabs__content{
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
