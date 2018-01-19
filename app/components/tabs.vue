<template>
	<div class="tabs">
		<Tabs type="card" v-model="active" @tab-click="click">
			<TabPane
			v-for="tab in tabs"
			:label="tab.label"
			:name="tab.id"
			:key="tab.id">
			<slot name="tab" v-bind="tab"></slot>
			</TabPane>
 		</Tabs>
	</div>
</template>

<script>
import {Tabs, TabPane} from "element-ui";

export default {
	components: {Tabs, TabPane},
	props: {
		tabs: {type: Array, required: true},
		tab: {type: String, required: false}
	},
	data() {
		return {
			active: this.tab
		}
	},
	methods: {
		click() {
			this.$emit("tab", this.active);
		}
	}
};
</script>

<style lang="scss" scoped>
.tabs {
	/deep/ {
		.el-tabs__header {
			margin: 0;
		}
		.el-tabs__nav {
			overflow: hidden;
		}
		.el-tabs__item {
			font-weight: 400;
			color: $blue4;
			background-color: $white1;
			border-bottom: 1px solid #e4e7ed;

			&.is-active {
				border-bottom-color: $white1;
				color: $blue5;
			}
		}
		.el-tabs__content {
			background-color: $white1;
			border: 1px solid #e4e7ed;
			border-radius: 4px;
			border-top-left-radius: 0;
			margin-top: -1px;
			padding: 1.5em;
		}
	}
}
</style>
