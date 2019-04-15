<template>
	<Menu
		mode="horizontal"
		:default-active="active"
		:router="true"
		menu-trigger="click"
	>
		<template v-for="item in menu">
			<MenuItem v-if="!item.items" :index="item.link" :key="item.link">{{
				item.title
			}}</MenuItem>

			<Submenu v-else :index="item.title" :key="item.title">
				<template slot="title">{{ item.title }}</template>
				<MenuItem
					v-for="subitem in item.items"
					:index="subitem.link"
					:key="subitem.link"
				>
					{{ subitem.title }}
				</MenuItem>
			</Submenu>
		</template>
	</Menu>
</template>

<script>
import {Menu, Submenu, MenuItem} from "element-ui";

export default {
	components: {Menu, Submenu, MenuItem},
	computed: {
		menu: (t) => t.$store.getters["config/menu"],
		active: (t) => t.$route.path
	}
};
</script>

<style lang="scss">
.el-menu--horizontal {
	border-bottom: 0;

	.el-menu-item {
		&.is-active {
			border-bottom-color: lightblue !important;
			color: lightblue !important;
		}
	}

	> .el-menu-item {
		background-color: #334056 !important;
		color: $white1 !important;
	}

	.el-submenu {
		.el-submenu__title {
			background-color: #334056 !important;
			color: $white1 !important;
			border-bottom: 0 !important;
		}
	}
}
</style>
