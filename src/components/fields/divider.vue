<template>
	<div class="divider">
		<div class="text" v-if="_text" v-text="_text" />
	</div>
</template>

<script>
export default {
	meta: {
		res: {
			props: {
				_text: "Divider title"
			}
		}
	},
	props: {
		_text: {
			type: String,
			required: false,
			note: `Don't use field label with the divider`
		}
	}
};
</script>

<style lang="scss" scoped>
.divider {
	border-bottom: 1px solid $black1;

	.text {
		margin-bottom: 0.5em;
		font-weight: 500;
		font-size: 14px;
	}
}
</style>
