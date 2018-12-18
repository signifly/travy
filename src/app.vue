<template>
	<div class="app">
		<component :is="layout" v-if="layout"/>
	</div>
</template>

<script>
import layouts from "./components/layouts";

export default {
	computed: {
		layout() {
			const name = this.$route.meta.layout;

			if (name) {
				return layouts[name];
			}
		}
	}
};
</script>
