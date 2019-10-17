<template>
	<div class="main" v-if="user">
		<Container class="is-vertical">
			<vHeader />
			<transition name="router">
				<router-view />
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
		title: (t) => t.$route.meta.title,
		user: (t) => t.$store.getters["user/data"],
		page: (t) => (t.title ? {title: t.title, to: t.$route.path} : null)
	}
};
</script>

<style lang="scss" scoped>
.main {
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
