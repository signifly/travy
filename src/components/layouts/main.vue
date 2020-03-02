<template>
	<div class="main">
		<Container class="is-vertical">
			<vHeader v-if="ready" />
			<div class="hero-placeholder" :style="{backgroundColor: theme.color}" />

			<div class="page">
				<transition name="router">
					<router-view :key="$route.path" />
				</transition>
			</div>
		</Container>
	</div>
</template>

<script>
import vHeader from "@/components/header";
import {Container} from "element-ui";

export default {
	components: {Container, vHeader},
	computed: {
		theme: (t) => t.$store.getters["config/theme"],
		ready: (t) => t.$store.getters["base/ready"]
	}
};
</script>

<style lang="scss" scoped>
.main {
	background-color: $white2;
	min-height: 100vh;

	.hero-placeholder {
		height: $heroHeight;
		position: absolute;
		width: 100%;
		top: 64px;
	}

	.page {
		position: relative;
	}

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
