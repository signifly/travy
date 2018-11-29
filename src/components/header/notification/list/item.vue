<template>
	<div class="item" :class="{is_read}">
		<div class="status">
			<div class="dot" :class="status"/>
		</div>

		<div class="info">
			<div class="title" v-text="title"/>
			<div class="msg" v-text="message"/>
			<div class="date" v-text="date"/>
			<div class="link">

			</div>
		</div>
	</div>
</template>

<script>
import {date} from "@/modules/utils";

export default {
	props: {
		id: {type: String, required: true},
		title: {type: String, required: true},
		message: {type: String, required: true},
		is_read: {type: Boolean, required: true},
		status: {type: String, default: "primary"},
		updated_at: {type: Number, required: true}
	},
	computed: {
		date: (t) => date(t.updated_at).sDateTime
	}
};
</script>

<style lang="scss" scoped>
.item {
	font-size: 0.8em;
	padding: 1em;
	border-bottom: 1px solid $blue3;
	display: flex;
	// background-color: $white2;

	&.is_read {
		background-color: $white1;
	}

	.status {
		margin-top: 0.2em;

		.dot {
			$s: 8px;
			width: $s;
			height: $s;
			border-radius: 50%;

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

	.info {
		margin-left: 0.5em;

		.title {
			font-weight: 600;
			margin-bottom: 0.5em;
		}

		.msg {
			margin-bottom: 0.5em;
			line-height: 1.25em;
		}

		.date {
			color: $blue4;
			font-size: 0.85em;
		}
	}
}
</style>
