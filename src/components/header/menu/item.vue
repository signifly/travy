<template>
	<MenuItem v-if="!item.items" :index="item.url" :key="item.name">
		{{ item.name }}
	</MenuItem>

	<Submenu v-else :index="item.name" :key="item.name">
		<template slot="title">{{ item.name }}</template>
		<item v-for="item in item.items" :key="item.name" v-bind="{item}" />
	</Submenu>
</template>

<script>
import {MenuItem, Submenu} from "element-ui";
import item from "./item";

export default {
	components: {Submenu, MenuItem},
	props: {
		item: {type: Object, required: true}
	},
	beforeCreate() {
		this.$options.components.item = item;
	}
};
</script>
