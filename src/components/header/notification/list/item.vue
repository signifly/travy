<template>
	<div class="item">
		<div class="status">
			<div class="dot" :class="status"/>
		</div>

		<div class="info">
			<div class="title" v-text="title"/>
			<div class="msg" v-text="message"/>
			<div class="link">

			</div>
		</div>
		{{message}}
	</div>
</template>

<script>
export default {
	props: {
		id: {type: String, required: true},
		title: {type: String, default: "a title"},
		status: {type: String, default: "primary"},
		message: {type: String, required: true},
		is_read: {type: Boolean, required: true}
	}
};
</script>

<style lang="scss" scoped>
.item {
	font-size: 0.8em;
	padding: 1em;
	border-bottom: 1px solid $blue3;

	display: flex;

	.status {
		.dot {
			$s: 8px;
			width: $s;
			height: $s;
			border-radius: 50%;
			margin-left: 0.5em;

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
</style>
