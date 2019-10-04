<template>
	<div class="main" v-if="user">
		<Container class="is-vertical">
			<vHeader />
			<vBreadcrumb v-if="page" :items="[page]" />
			<router-view />
		</Container>
	</div>
</template>

<script>
import vBreadcrumb from "../breadcrumb.vue";
import vHeader from "@/components/header";
import {Container} from "element-ui";

export default {
	components: {vBreadcrumb, Container, vHeader},
	computed: {
		title: (t) => t.$route.meta.title,
		user: (t) => t.$store.getters["user/data"],
		page: (t) => (t.title ? {title: t.title, to: t.$route.path} : null)
	}
};
</script>
