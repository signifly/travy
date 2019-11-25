<template>
	<Menu
		menu-trigger="click"
		text-color="#1e2d3e"
		mode="horizontal"
		:router="true"
		ref="menu"
	>
		<item v-for="item in header.menu" v-bind="{item}" :key="item.name" />
	</Menu>
</template>

<script>
import {Menu} from "element-ui";
import item from "./item";

export default {
	components: {Menu, item},
	computed: {
		header: (t) => t.$store.getters["config/header"],
		config: (t) => t.$store.getters["config/data"]
	},
	mounted() {
		// fix element-ui active menu
		this.$watch("$route", ({path}) => (this.$refs.menu.activeIndex = path), {
			immediate: true
		});
	}
};
</script>

<style lang="scss">
.el-menu--horizontal {
	border: 0 !important;

	> .el-menu-item,
	> .el-submenu {
		border-top: 4px solid transparent;
		line-height: 56px;
		border-bottom: 0;
		transition: none;

		.el-submenu__title {
			line-height: inherit;
			border-color: transparent;
			border-bottom: 0 !important;
		}

		&.is-active {
			border-bottom: 0;
			border-color: transparent;
			border-top-color: #1f2d3d;
		}
	}

	.el-menu-item {
		&.is-active {
			pointer-events: none;
		}
	}

	.el-menu--popup {
		.el-menu-item.is-active {
			font-weight: 600;
		}
	}
}
</style>
