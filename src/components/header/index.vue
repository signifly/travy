<template>
	<Header>
		<router-link
			class="home"
			:to="{name: 'index'}"
			v-html="require('@/assets/icons/home.svg')"
		/>

		<vMenu/>

		<div class="account">
			<notification/>
			<user/>
		</div>
	</Header>
</template>

<script>
import notification from "./notification";
import {Header} from "element-ui";
import vMenu from "./menu";
import user from "./user";

export default {
	components: {Header, notification, vMenu, user}
};
</script>

<style lang="scss" scoped>
.el-header {
	background-color: #334056;
	color: $white1;
	user-select: none;
	display: flex;
	align-items: center;
	padding: 0;

	.home {
		background-color: #2B384B;
		height: 100%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 60px;

		::v-deep svg {
			$s: 1.9em;
			width: $s;
			height: $s;
			path {
				fill: $white1;
			}
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
