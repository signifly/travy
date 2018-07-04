<template>
	<Header>
		<router-link class="home" :to="{name: 'index'}" v-html="icons.home" />

		<Menu
			mode="horizontal"
			:default-active="menuActive"
			:router="true"
			menu-trigger="click">

			<template v-for="item in menu">
				<MenuItem v-if="!item.items" :index="item.link">{{item.title}}</MenuItem>

				<Submenu v-else :index="item.title">
					<template slot="title">{{item.title}}</template>
					<MenuItem v-for="subitem in item.items" :index="subitem.link" :key="subitem.link">{{subitem.title}}</MenuItem>
				</Submenu>
			</template>
		</Menu>

		<div class="account">
			<div class="dropdown">
				<Dropdown trigger="click" :show-timeout="0" :hide-timeout="0" @command="account">
					<a class="el-dropdown-link">
						{{user.name}}<i class="el-icon-arrow-down el-icon--right"></i>
					</a>

					<DropdownMenu slot="dropdown" @command="$event()">
						<DropdownItem :command="settings">Settings</DropdownItem>
						<DropdownItem divided :command="logout">Logout</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</div>

			<!-- <a class="notification">
				<Badge is-dot>
					<div class="icon" v-html="icons.bell" />
				</Badge>
			</a> -->
		</div>
	</Header>
</template>

<script>
import {Header, Menu, Submenu, MenuItem, Dropdown, DropdownMenu, DropdownItem, Badge} from "element-ui";

export default {
	components: {Header, Menu, Submenu, MenuItem, Dropdown, DropdownMenu, DropdownItem, Badge},
	data() {
		return {
			icons: {
				home: require("@/assets/icons/home.svg"),
				bell: require("@/assets/icons/bell.svg")
			}
		}
	},
	computed: {
		menu: (t) => t.$store.getters["config/menu"],
		user: (t) => t.$store.getters["user/data"],
		menuActive: (t) => t.$route.path
	},
	methods: {
		account: (action = () => {}) => action(),

		logout() {
			this.$store.dispatch("user/logout", {post: true});
		},

		settings() {
			this.$router.push({name: "account"});
		}
	}
};
</script>

<style lang="scss">
.el-menu--horizontal {
	border-bottom: 0;

	.el-menu-item {
		&.is-active {
			border-bottom-color: lightblue !important;
			color: lightblue !important;
		}
	}

	> .el-menu-item {
		background-color: #334056 !important;
		color: $white1 !important;
	}

	.el-submenu {
		.el-submenu__title {
			background-color: #334056 !important;
			color: $white1 !important;
			border-bottom: 0 !important;
		}
	}
}
</style>

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

		/deep/ svg {
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

		.dropdown {
			.el-dropdown {
				color: $white1;
			}
		}

		.notification {
			display: inline-flex;
			height: 100%;
			align-items: center;
			justify-content: center;
			width: 60px;

			.icon {
				/deep/ svg {
					$s: 1.7em;
					width: $s;
					height: $s;
					path {
						fill: $white1;
					}
				}
			}

			.el-badge {
				/deep/ .is-dot {
					border: 0px;
					right: 1em;
					top: 0.4em;
				}
			}
		}
	}
}
</style>
