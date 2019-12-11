<template>
	<div class="notification">
		<a class="badge" @mousedown="toggle">
			<Badge :hidden="!unread" :value="unread || 1" :max="99" type="primary">
				<i class="el-icon-news" />
			</Badge>
		</a>

		<popup
			:unread.sync="unread"
			:active.sync="active"
			v-bind="{user}"
			v-if="active"
		/>
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
		};
	},
	computed: {
		user: (t) => t.$store.getters["user/data"]
	},
	methods: {
		toggle() {
			this.active = !this.active;
		},

		async getUnread() {
			const {
				data: {meta}
			} = await this.$axios.get("account/notifications", {
				params: {count: 1, filter: {read: false}}
			});
			this.unread = meta.total;
		}
	},
	created() {
		this.getUnread();
		this.$ws.on(`users.${this.user.id}`, () => this.unread++);
	}
};
</script>

<style lang="scss" scoped>
.notification {
	position: relative;
	margin-left: 1em;
	color: $black1;

	.badge {
		justify-content: center;
		display: inline-flex;
		align-items: center;
		height: 100%;

		.el-badge {
			i {
				font-size: 18px;
			}

			::v-deep {
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
