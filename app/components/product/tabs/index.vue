<template>
	<div class="tabs">
		<vTabs v-bind="{tabs, tab}" @tab="tabClick">
			<template slot="label" slot-scope="item">
				<vLabel v-bind="item" :edit="edits[item.id]"></vLabel>
			</template>


			<template slot="content" slot-scope="item" v-if="loaded.has(item.id)">
				<div class="title">{{item.label}}</div>
				<component
					v-if="components[item.fieldType.id]"
					:is="item.fieldType.id"
					v-bind="item"
					@edit="edit({id: item.id, func: $event})"
				/>
			</template>
		</vTabs>
	</div>
</template>

<script>
import vTabs from "@/components/tabs.vue";
import vLabel from "./label.vue";
import {vBasic, vContent} from "./components";

export default {
	components: {vTabs, vLabel, vBasic, vContent},
	props: {
		tabs: {type: Array, required: true}
	},
	data() {
		return {
			loaded: new Set(),
			edits: {}
		}
	},
	computed: {
		components: (t) => t.$options.components,
		tab: (t) => t.$route.params.tab || "basic"
	},
	methods: {
		tabClick(id) {
			this.$router.push({name: "product-tab", params: {tab: id}});
			this.loaded.add(id);
		},
		edit({id, func}) {
			this.$set(this.edits, id, func);
		}
	},
	created() {
		this.loaded.add(this.tab);
	}
};
</script>

<style lang="scss" scoped>
.tabs {
	.title {
		margin-bottom: 1.5em;
	}
	/deep/ {
		.el-tabs__header {
			display: flex;
			margin: 0;
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

		.el-tabs__nav-scroll {
			overflow: visible;
		}

		.el-tabs__nav-wrap {
			overflow: unset;
		}
	}
}
</style>
