<template>
	<a class="expand-toggle" :class="{expanded}" @click="toggle">
		<i class="el-icon-arrow-right" />
	</a>
</template>
<script>
export default {
	props: {
		expanded: {type: Boolean, required: false}
	},
	methods: {
		toggle() {
			this.$emit("update:expanded", !this.expanded);
		}
	}
};
</script>

<style lang="scss" scoped>
.expand-toggle {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0.5em 0;
	color: #666;
	transition: cubic(transform, 0.15s);

	&.expanded {
		transform: rotate(90deg);
	}
}
</style>
