<template>
	<div class="index">
		index
	</div>
</template>

<script>
import store from "@/store";

export default {
	beforeRouteEnter (to, from, next) {
		const redirect = store.getters["config/frontpage"];
		next(redirect === "/" ? true : redirect);
	}
};
</script>
