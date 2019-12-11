<template>
	<div class="item" :class="{is_read}" @click="itemRead">
		<div class="unread">
			<div class="dot" :class="{is_read}" />
		</div>

		<div class="info">
			<div class="title" v-text="title" />
			<div class="msg" v-text="message" />
			<div class="link" v-if="link">
				<Button size="mini" @click="goToLink">{{ link_text }}</Button>
			</div>

			<div class="bottom">
				<div class="date" v-text="date" />
				<div class="status" :class="status" />
			</div>
		</div>
	</div>
</template>

<script>
import {date} from "@/modules/utils";
import {Button} from "element-ui";

export default {
	components: {Button},
	props: {
		link_text: {type: String, required: false},
		status: {type: String, default: "primary"},
		created_at: {type: Number, required: true},
		is_read: {type: Boolean, required: true},
		message: {type: String, required: true},
		link: {type: String, required: false},
		title: {type: String, required: true},
		id: {type: String, required: true}
	},
	computed: {
		date: (t) => date(t.created_at).sDateTime
	},
	methods: {
		async itemRead() {
			if (!this.is_read) {
				await this.$axios.post("account/notifications", {
					data: {ids: [this.id]}
				});

				this.$emit("itemRead", this.id);
			}
		},
		async goToLink() {
			await this.itemRead();
			this.$router.push(this.link);
		}
	}
};
</script>

<style lang="scss" scoped>
.item {
	padding: 1em;
	border-bottom: 1px solid $blue3;
	display: flex;
	background-color: $white2;

	&:last-child {
		border: 0;
	}

	&.is_read {
		background-color: $white1;
	}

	.unread {
		margin-top: 0.2em;

		.dot {
			$s: 8px;
			width: $s;
			height: $s;
			border-radius: 50%;
			background-color: $warning;

			&.is_read {
				background-color: $white1;
			}
		}
	}

	.info {
		width: 100%;
		margin-left: 0.5em;

		.title {
			font-weight: 600;
		}

		.msg {
			margin: 0.5em 0;
			line-height: 1.25em;
		}

		.link {
			margin-bottom: 0.5em;
		}

		.bottom {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.date {
				color: $blue4;
				font-size: 0.85em;
			}

			.status {
				width: 14px;
				height: 6px;
				border-radius: 4px;
				opacity: 0.75;

				&.success {
					background-color: $success;
				}
				&.primary {
					background-color: $primary;
				}
				&.danger {
					background-color: $danger;
				}
				&.warning {
					background-color: $warning;
				}
				&.info {
					background-color: $info;
				}
			}
		}
	}
}
</style>
