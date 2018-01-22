<template>
	<div class="tabs">
		<tabs v-bind="{tabs, tab}" @tab="tabClick">
			<div slot="tab" slot-scope="item">
				<template v-if="item.id === tab">
					<component
						v-if="components[item.fieldType.id]"
						:is="item.fieldType.id"
						v-bind="item"
					/>
				</template>
			</div>
		</tabs>
	</div>
</template>

<script>
import tabs from "@/components/tabs.vue";
import {vBasic, vContent} from "./components";

export default {
	components: {tabs, vBasic, vContent},
	props: {
		tabs: {type: Array, required: true}
	},
	computed: {
		components: (t) => t.$options.components,
		tab: (t) => t.$route.params.tab || "basic"
	},
	methods: {
		tabClick(id) {
			this.$router.push({name: "product-tab", params: {tab: id}});
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
