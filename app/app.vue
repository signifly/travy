<template>
	<div class="app">
		<Container class="is-vertical">
			<vHeader/>
			<Main>
				<breadcrumb/>
				<router-view/>
			</Main>
		</Container>
	</div>
</template>

<script>
import {Container, Header, Main, Menu, MenuItem} from "element-ui";
import vHeader from "./components/header.vue";
import breadcrumb from "./components/breadcrumb.vue";

export default {
	components: {Container, Main, vHeader, breadcrumb}
};
</script>

<style lang="scss" scoped>
.app {
	.el-header {
		background-color: #334056;

		.el-menu {
			background-color: #334056;
		}
	}
}
</style>
