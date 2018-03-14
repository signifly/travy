<template>
	<div class="main" v-if="user">
		<Container class="is-vertical">
			<vHeader/>
			<Main>
				<div class="container">
					<router-view />
				</div>
			</Main>
		</Container>
	</div>
</template>

<script>
import {Container, Main} from "element-ui";
import vHeader from "@/components/header.vue";

export default {
	components: {Container, Main, vHeader},
	computed: {
		user: (t) => t.$store.getters["user/data"]
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
