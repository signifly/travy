<template>
	<div class="app">
		<component :is="layout"/>
	</div>
</template>

<script>
import * as layouts from "./components/layouts";

export default {
	components: {...layouts},
	computed: {
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
