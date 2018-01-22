<template>
	<router-link v-if="action" class="text" :class="status" :to="action">{{text}}</router-link>
	<div class="text" :class="status" v-else>{{text}}</div>
</template>

<script>
export default {
	props: {
		text: {type: String, required: false},
		action: {type: String, required: false},
		status: {
			required: false,
			validator: function (value) {
				return ["danger", "warning", "info", "success"].includes(value);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.text {
	display: block;
	color: $black1;
	text-decoration: none;

	&.danger {
		color: $danger;
	}
	&.warning {
		color: $warning;
	}
	&.info {
		color: $info;
	}
	&.success {
		color: $success;
	}
}
</style>
