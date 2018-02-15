<template>
	<div class="app">
		<component :is="layout" v-if="$route.name" />
	</div>
</template>

<script>
import * as layouts from "./components/layouts";

export default {
	components: {...layouts},
	computed: {
		layout: (t) => t.$route.meta.layout || "vMain"
	}
};
</script>

<style lang="scss" scoped>
.app {
	.main {
		background-color: $white2;
		min-height: 100vh;
	}
}
</style>
