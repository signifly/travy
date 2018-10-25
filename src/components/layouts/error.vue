<template>
	<div class="error">
		<vHeader v-if="user"/>
		<vbase/>
	</div>
</template>

<script>
import vHeader from "@/components/header.vue";
import vbase from "./base.vue";

export default {
	components: {vbase, vHeader},
	computed: {
		user: (t) => t.$store.getters["user/data"]
	}
};
</script>
