<template>
	<error>
		<template slot="title">Error</template>
		<template slot="text">Something went wrong</template>
	</error>
</template>

<script>
import error from "@/components/error.vue";

export default {
	components: {error}
};
</script>
