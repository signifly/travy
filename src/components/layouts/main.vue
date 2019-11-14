<template>
	<div class="main">
		<Container class="is-vertical">
			<vHeader v-if="ready" />
			<transition name="router">
				<router-view :key="$route.path" />
			</transition>
		</Container>
	</div>
</template>

<script>
import vHeader from "@/components/header";
import {Container} from "element-ui";

export default {
	components: {Container, vHeader},
	computed: {
		ready: (t) => t.$store.getters["base/ready"]
	}
};
</script>

<style lang="scss" scoped>
.main {
	background-color: $white2;
	min-height: 100vh;

	.router {
		&-enter-active,
		&-leave-active {
			transition: cubic(opacity, 0.1s);
		}

		&-enter,
		&-leave-to {
			opacity: 0;
		}
	}
}
</style>
