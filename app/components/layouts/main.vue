<template>
	<div class="main">
		<Container class="is-vertical">
			<vHeader/>
			<Main>
				<router-view />
			</Main>
		</Container>
	</div>
</template>

<script>
import {Container, Main} from "element-ui";
import vHeader from "@/components/header.vue";

export default {
	components: {Container, Main, vHeader}
};
</script>

<style lang="scss" scoped>
.clean {

}
</style>
