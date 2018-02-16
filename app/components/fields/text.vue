<template>
	<div class="text" :class="status">{{text}}</div>
</template>

<script>
export default {
	meta: {
		res: {
			props: {
				text: "title"
			},
			data: {
				title: "some text"
			}
		}
	},
	props: {
		text: {type: [String, Number], required: false},
		status: {
			type: String,
			required: false,
			note: `danger, warning, info, primary, success`,
			validator: function (value) {
				return ["danger", "warning", "info", "primary", "success"].includes(value);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.text {
	&.danger {
		color: $danger;
	}
	&.warning {
		color: $warning;
	}
	&.info {
		color: $info;
	}
	&.primary {
		color: $primary;
	}
	&.success {
		color: $success;
	}
}
</style>
