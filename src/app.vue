<template>
	<div class="app">
		<component :is="layout" v-if="layout"/>
	</div>
</template>

<script>
export default {
	computed: {
		layout() {
			const layout = this.$route.meta.layout;

			if (layout) {
				return () => import(/* webpackMode: "eager" */ `@/components/layouts/${layout}`);
			}
		}
	}
};
</script>
