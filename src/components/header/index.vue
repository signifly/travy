<template>
	<Header height="64px">
		<router-link class="logo" :to="{name: 'index'}">
			<img :src="config.theme.logo" />
		</router-link>

		<vMenu />

		<div class="account">
			<notification v-if="notifications" />
			<user />
		</div>
	</Header>
</template>

<script>
import notification from "./notification";
import {Header} from "element-ui";
import vMenu from "./menu";
import user from "./user";

export default {
	components: {Header, notification, vMenu, user},
	computed: {
		config: (t) => t.$store.getters["config/data"],
		notifications: (t) => t.config.notifications !== false
	}
};
</script>

<style lang="scss" scoped>
.el-header {
	background-color: $white1;
	align-items: center;
	user-select: none;
	padding: 0 3em;
	display: flex;

	.logo {
		margin-right: 2em;
		justify-content: center;
		display: inline-flex;
		align-items: center;

		img {
			max-height: 40px;
		}
	}

	.account {
		margin-left: auto;
		display: flex;
		align-items: center;
		padding-right: 1em;
	}
}
</style>
