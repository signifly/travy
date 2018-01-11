<template>
	<Header>
		<Menu
			mode="horizontal"
			background-color="#334056"
			text-color="#fff"
			active-text-color="lightblue"
			:router="true"
			menu-trigger="click">

			<MenuItem index="/">Home</MenuItem>
			<Submenu index="2">
				<template slot="title">Catalogue</template>
				<MenuItem index="products">Products</MenuItem>
				<MenuItem index="2">Collections</MenuItem>
				<MenuItem index="3">Stock items</MenuItem>
				<MenuItem index="4">Stock item models</MenuItem>
				<MenuItem index="5">Prices</MenuItem>
				<MenuItem index="6">Price lists</MenuItem>
				<MenuItem index="7">Files</MenuItem>
			</Submenu>
			<MenuItem index="2">Translations</MenuItem>
			<MenuItem index="3">Shops</MenuItem>
			<MenuItem index="4">Orders</MenuItem>
			<MenuItem index="5">Partners</MenuItem>
			<Submenu index="6">
				<template slot="title">Settings</template>
				<MenuItem index="1">Shops</MenuItem>
				<MenuItem index="2">Language</MenuItem>
				<MenuItem index="3">Currencies</MenuItem>
				<MenuItem index="4">Materials</MenuItem>
				<MenuItem index="5">Users</MenuItem>
			</Submenu>

		</Menu>
	</Header>
</template>

<script>
import {Header, Menu, Submenu, MenuItem} from "element-ui";

export default {
	components: {Header, Menu, Submenu, MenuItem}
};
</script>

<style lang="scss" scoped>
.el-header {
	user-select: none;
}
</style>
