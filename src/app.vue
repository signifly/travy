<template>
	<div class="app">
		<component :is="layout" />
	</div>
</template>

<script>
import layouts from "./components/layouts";

export default {
	computed: {
		layout: (t) => layouts[t.$route.meta.layout || "main"]
	}
};
</script>
