<template>
	<div class="app">
		<component v-if="!serverError" :is="layout"/>

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
		layout: (t) => t.$route.meta.layout,
		serverError: (t) => t.$store.getters["config/serverError"]
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
