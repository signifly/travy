<template>
	<div class="main" v-if="user">
		<Container class="is-vertical">
			<vHeader />
			<Main>
				<div class="container">
					<vBreadcrumb v-if="page" :items="[page]" />
					<router-view />
				</div>
			</Main>
		</Container>
	</div>
</template>

<script>
import vBreadcrumb from "../breadcrumb.vue";
import {Container, Main} from "element-ui";
import vHeader from "@/components/header";

export default {
	components: {vBreadcrumb, Container, Main, vHeader},
	computed: {
		title: (t) => t.$route.meta.title,
		user: (t) => t.$store.getters["user/data"],
		page: (t) => (t.title ? {title: t.title, to: t.$route.path} : null)
	}
};
</script>

<style lang="scss" scoped>
.main {
	.container {
		max-width: $width;
		margin: 0 auto;
	}
}
</style>
