<template>
	<div class="user">
		<div class="image" :style="{backgroundImage: `url('${user.image_url}')`}" />

		<Dropdown
			trigger="click"
			:show-timeout="0"
			:hide-timeout="0"
			@command="command"
		>
			<a class="el-dropdown-link">
				{{ user.name }}<i class="el-icon-arrow-down el-icon--right"></i>
			</a>

			<DropdownMenu slot="dropdown" @command="$event()">
				<DropdownItem :command="account">
					{{
						$translate({
							en: "Account",
							da: "Profil"
						})
					}}
				</DropdownItem>
				<DropdownItem divided :command="logout">
					{{
						$translate({
							en: "Logout",
							da: "Log ud"
						})
					}}
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	</div>
</template>

<script>
import {Dropdown, DropdownMenu, DropdownItem} from "element-ui";

export default {
	components: {Dropdown, DropdownMenu, DropdownItem},
	computed: {
		user: (t) => t.$store.getters["user/data"]
	},
	methods: {
		command: (action = () => {}) => action(),

		logout() {
			this.$store.dispatch("user/logout");
		},

		account() {
			this.$router.push({name: "account"});
		}
	}
};
</script>

<style lang="scss" scoped>
.user {
	display: flex;
	align-items: center;

	.image {
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		margin-right: 0.5em;
		border-radius: 50%;
		$s: 24px;
		width: $s;
		height: $s;
	}
}
</style>
