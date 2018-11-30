<template>
	<div class="notification">
		<a class="badge" @mousedown="toggle">
			<Badge :value="unread" :max="99" type="primary">
				<div class="icon" v-html="require('@/assets/icons/bell.svg')"/>
			</Badge>
		</a>

		<popup v-if="active"/>
	</div>
</template>

<script>
import {Badge} from "element-ui";
import popup from "./popup";

export default {
	components: {Badge, popup},
	data() {
		return {
			active: false,
			unread: 0
		}
	},
	methods: {
		toggle() {
			this.active = !this.active;
		},
		async getUnread() {
			const {data: {meta}} = await this.$axios.get("account/notifications", {params: {count: 1, filter: {read: false}}});
			this.unread = meta.total;
		}
	},
	created() {
		this.getUnread();
		setInterval(this.getUnread, 5000);
	}
};
</script>

<style lang="scss" scoped>
.notification {
	position: relative;
	outline: none;
	color: $black1;

	.badge {
		display: inline-flex;
		height: 100%;
		align-items: center;
		justify-content: center;
		width: 60px;
		margin-top: 4px;

		.icon {
			display: inline-flex;

			/deep/ svg {
				$s: 1.5em;
				width: $s;
				height: $s;
				path {
					fill: $white1;
				}
			}
		}

		.el-badge {
			/deep/ {
				.is-dot {
					border: 0px;
					right: 0.9em;
					top: 0.4em;
				}
				.el-badge__content {
					font-weight: bold;
					font-size: 0.7em;
					border: 0px;
				}
			}
		}
	}
}
</style>
