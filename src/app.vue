<template>
	<div class="app">
		<component :is="layoutComp" v-if="layout"/>
	</div>
</template>

<script>
import vmain from "./components/layouts/main.vue";
import vbase from "./components/layouts/base.vue";
import verror from "./components/layouts/error.vue";

export default {
	components: {vmain, vbase, verror},
	computed: {
		layout: (t) => t.$route.meta.layout,
		layoutComp: (t) => `v${t.layout}`
	}
};
</script>
