<template>
	<div class="divider">
		<div class="text" v-if="text" v-text="text" />
	</div>
</template>

<script>
export default {
	meta: {
		spec: "props",
		res: {
			props: {
				text: "Divider title"
			}
		}
	},
	props: {
		text: {
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
