<template>
	<Header>
		<router-link class="home" :to="{name: 'index'}" v-html="icons.home" />

		<Menu
			mode="horizontal"
			active-text-color="lightblue"
			:router="true"
			menu-trigger="click">
			<MenuItem index="/test">Test</MenuItem>
			<Submenu index="2">
				<template slot="title">Catalogue</template>
				<MenuItem index="/products">Products</MenuItem>
				<MenuItem index="/collections">Collections</MenuItem>
				<MenuItem index="/stock-items">Stock items</MenuItem>
				<MenuItem index="/stock-item-models">Stock item models</MenuItem>
				<MenuItem index="/prices">Prices</MenuItem>
				<MenuItem index="/price-lists">Price lists</MenuItem>
				<MenuItem index="/files">Files</MenuItem>
				<MenuItem index="/options">Options</MenuItem>
			</Submenu>
			<MenuItem index="/translations">Translations</MenuItem>
			<MenuItem index="/shops">Shops</MenuItem>
			<MenuItem index="/orders">Orders</MenuItem>
			<MenuItem index="/partners">Partners</MenuItem>
			<Submenu index="/6234234">
				<template slot="title">Settings</template>
				<MenuItem index="/shops">Shops</MenuItem>
				<MenuItem index="/languages">Languages</MenuItem>
				<MenuItem index="/currencies">Currencies</MenuItem>
				<MenuItem index="/materials">Materials</MenuItem>
				<MenuItem index="/users">Users</MenuItem>
			</Submenu>
		</Menu>

		<div class="account">
			<div class="dropdown">
				<Dropdown trigger="click" :show-timeout="0" :hide-timeout="0" @command="account">
					<a class="el-dropdown-link">
						{{user.first_name}}<i class="el-icon-arrow-down el-icon--right"></i>
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
		user: (t) => t.$store.getters["user/data"]
	},
	methods: {
		account(action = () => {}) {
			action();
		},
		logout() {
			this.$store.dispatch("user/logout", {post: true});
		},
		settings() {
			this.$router.push({name: "users-view", params: {id: this.user.id.toString()}});
		}
	}
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

		/deep/ svg {
			$s: 1.9em;
			width: $s;
			height: $s;
			path {
				fill: $white1;
			}
		}
	}

	.el-menu--horizontal {
		background-color: #334056;
		border-bottom: 0;

		> .el-menu-item {
			background-color: #334056;
			color: $white1;
		}

		/deep/ {
			.el-submenu {
				.el-submenu__title {
					background-color: #334056;
					color: $white1;
				}
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
