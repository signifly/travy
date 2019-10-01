<template>
	<layout v-bind="{sidebar}">
		<component :is="page" ref="page" @sidebar="sidebar = $event" />
	</layout>
</template>

<script>
import layout from "@/pages/meta/layout.vue";

export default {
	components: {layout},
	data() {
		return {
			sidebar: {},
			path: ""
		};
	},
	computed: {
		page() {
			if (this.path) {
				return () => import(/* webpackMode: "eager" */ `./${this.path}`);
			} else {
				return "";
			}
		}
	},
	created() {
		this.$watch(
			"$route",
			(route) => {
				this.path = route.params.pathMatch;
			},
			{
				immediate: true
			}
		);
	}
};
</script>
