<template>
	<Header height="64px">
		<router-link class="logo" :to="{name: 'index'}">
			<div class="img" :style="{backgroundImage: `url('${theme.logo}')`}" />
		</router-link>

		<vMenu />

		<div class="right">
			<div class="link" v-if="header.link">
				<a :href="header.link.url" v-text="header.link.name" />
			</div>

			<div class="account">
				<notification v-if="notifications" />
				<user />
			</div>
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
		notifications: (t) => t.header.notifications !== false,
		header: (t) => t.$store.getters["config/header"],
		theme: (t) => t.$store.getters["config/theme"]
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
		justify-content: center;
		display: inline-flex;
		align-items: center;
		margin-right: 2em;

		.img {
			background-repeat: no-repeat;
			background-position: center;
			background-size: contain;
			width: 180px;
			height: 40px;
		}
	}

	.right {
		align-items: center;
		margin-left: auto;
		display: flex;

		.link {
			font-size: 12px;
			margin-right: 2.5em;

			a {
				text-decoration: none;
				color: $black1;
			}
		}

		.account {
			align-items: center;
			padding-right: 1em;
			display: flex;
		}
	}
}
</style>
