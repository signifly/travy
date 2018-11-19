<template>
	<div class="tabs">
		<!-- <vTabsGen v-bind="{tabs, tabId}" @tabClick="tabClick">
			<template slot="label" slot-scope="tab">
				<vLabel v-bind="{tab, options, edits, dataU, nodatas}"></vLabel>
			</template>

			<template slot="content" slot-scope="tab">
				<vTab :key="dataU" v-bind="{tab, data, options, errors}" @fieldA="$emit('fieldA', $event)" @nodata="nodata" />
			</template>
		</vTabsGen> -->


		<Tabs type="card" v-model="activeTab">
			<TabPane v-for="tab in tabs" :label="tab.title" :name="tab.id" :key="tab.id">
				<tab v-bind="[tab, {data}]" :key="tab.id" v-if="activeTab === tab.id"/>
			</TabPane>
		</Tabs>
	</div>
</template>

<script>
import {Tabs, TabPane} from "element-ui";
import tab from "./tab.vue";

// import vTabsGen from "@/components/tabs.vue";
// import vLabel from "./label.vue";
// import vTab from "./tab.vue";

export default {
	components: {Tabs, TabPane, tab},
	props: {
		tabs: {type: Array, required: true},
		data: {type: Object, required: true},
		dataU: {type: Number, required: true},
		edits: {type: Object, required: true},
		errors: {type: Object, required: false},
		options: {type: Object, required: false}
	},
	data() {
		return {
			activeTab: this.$route.params.tabId || this.tabs[0].id
		}
	}
};
</script>

<style lang="scss" scoped>
.tabs {
	/deep/{
		.el-tabs__header {
			display: flex;
			margin: 0;

			.el-tabs__item {
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
