<template>
	<div class="user">
		<Dropdown trigger="click" :show-timeout="0" :hide-timeout="0" @command="command">
			<a class="el-dropdown-link">
				{{user.name}}<i class="el-icon-arrow-down el-icon--right"></i>
			</a>

			<DropdownMenu slot="dropdown" @command="$event()">
				<DropdownItem :command="account">Account</DropdownItem>
				<DropdownItem divided :command="logout">Logout</DropdownItem>
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
			this.$store.dispatch("user/logout", {post: true});
		},

		account() {
			this.$router.push({name: "account"});
		}
	}
};
</script>

<style lang="scss" scoped>
.user {
	.el-dropdown {
		color: $white1;
	}
}
</style>
