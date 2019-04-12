<template>
	<layout v-bind="{sidebar}">
		<component :is="page" ref="page" @sidebar="sidebar = $event"/>
	</layout>
</template>

<script>
import layout from "@/pages/meta/layout.vue";

export default {
	components: {layout},
	data() {
		return {
			sidebar: {}
		}
	},
	computed: {
		pathMatch: (t) => t.$route.params.pathMatch,
		page() {
			const page = this.pathMatch;
			return () => import(/* webpackMode: "eager" */ `./${page}`);
		}
	}
};
</script>

<style lang="scss" scoped>
.index {

}
</style>
