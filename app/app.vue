<template>
	<div class="app">
		<Container class="is-vertical">
			<vHeader/>
			<Main>
				<router-view />
			</Main>
		</Container>
	</div>
</template>

<script>
import {Container, Header, Main, Menu, MenuItem} from "element-ui";
import vHeader from "./components/header.vue";

export default {
	components: {Container, Main, vHeader}
};
</script>

<style lang="scss" scoped>
.app {
	background-color: $white2;
	min-height: 100vh;
}
</style>
