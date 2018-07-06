<template>
	<div class="app">
		<component v-if="configLoaded" :is="layout" />

		<vError v-else>
			<template slot="title">Server is unavailable</template>
			<template slot="text">Oh no!</template>
		</vError>
	</div>
</template>

<script>
import * as layouts from "./components/layouts";
import vError from "./components/error.vue";

export default {
	components: {...layouts, vError},
	computed: {
		configLoaded: (t) => t.$store.getters["config/loaded"],
		layout: (t) => t.$route.meta.layout
	}
};
</script>

<style lang="scss" scoped>
.app {
	.error {
		margin-top: 12em;

		/deep/ {
			.title {
				font-size: 2em;
			}
		}
	}
}
</style>
