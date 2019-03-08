<template>
	<div class="notification">
		<a class="badge" @mousedown="toggle">
			<Badge :hidden="!unread" :value="unread || 1" :max="99" type="primary">
				<div class="icon" v-html="require('@/assets/icons/bell.svg')"/>
			</Badge>
		</a>

		<popup
			v-bind="{loading, meta}"
			:items.sync="items"
			v-show="active"
			@updateItems="updateItems"
			@updateItem="updateItem"
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
			loading: false,
			active: false,
			items: [],
			unread: 0,
			meta: {}
		}
	},
	computed: {
		user: (t) => t.$store.getters["user/data"]
	},
	methods: {
		toggle() {
			this.active = !this.active;
		},

		updateItem({id, ...data}) {
			this.getUnread();
			Object.assign(this.items.find(x => x.id === id), data);
		},

		updateItems(data) {
			this.getUnread();
			this.items = this.items.map(x => ({...x, ...data}));
		},

		async getUnread() {
			const {data: {meta}} = await this.$axios.get("account/notifications", {params: {count: 1, filter: {read: false}}});
			this.unread = meta.total;
		},

		async getItems({page} = {page: 1}) {
			if (this.loading) return;
			this.loading = true;

			try {
				const {data: {data, meta}} = await this.$axios.get("account/notifications", {params: {page, count: 20}});
				this.items = page > 1 ? [...this.items, ...data] : data;
				this.meta = meta;
			} catch(err) {
				// error
			} finally {
				this.loading = false;
			}
		}
	},
	created() {
		this.getItems();
		this.getUnread();

		this.$ws.on(`private-user.${this.user.id}`, () => {
			this.getItems();
			this.getUnread();
		});
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

			::v-deep svg {
				$s: 1.5em;
				width: $s;
				height: $s;
				path {
					fill: $white1;
				}
			}
		}

		.el-badge {
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
