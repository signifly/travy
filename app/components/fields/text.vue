<template>
	<div class="text" :class="status">{{text}}</div>
</template>

<script>
export default {
	props: {
		text: {type: [String, Number], required: false},
		status: {
			required: false,
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
