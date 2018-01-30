<template>
	<div class="tabs">
		<Tabs type="card" v-model="active">
			<TabPane v-for="tab in tabs" :name="tab.id" :key="tab.id">
				<slot name="label" slot="label" v-bind="tab">{{tab.label}}</slot>
				<slot name="content" v-bind="tab">content</slot>
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
	computed: {
		active: {
			get() {
				return this.tab;
			},
			set(tab) {
				this.$emit("tab", tab);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.tabs {
	/deep/ {
		.el-tabs__header {
			display: flex;
			margin: 0;

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
		}
		.el-tabs__content {
			background-color: $white1;
			border: 1px solid #e4e7ed;
			border-radius: 4px;
			border-top-left-radius: 0;
			margin-top: -1px;
			padding: 1.5em;
		}

		.el-tabs__nav-scroll {
			overflow: visible;
		}

		.el-tabs__nav-wrap {
			overflow: unset;
		}
	}
}
</style>
