<template>
	<error>
		<template slot="title">404</template>
		<template slot="text">Page not found</template>
	</error>
</template>

<script>
import error from "@/components/error.vue";

export default {
	components: {error}
};
</script>
