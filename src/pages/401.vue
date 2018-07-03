<template>
	<error>
		<template slot="title">401</template>
		<template slot="text">You don't have access to this page</template>
	</error>
</template>

<script>
import error from "@/components/error.vue";

export default {
	components: {error}
};
</script>
