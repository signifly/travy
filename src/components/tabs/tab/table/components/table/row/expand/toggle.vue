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
	justify-content: center;
	align-items: center;
	padding: 1em 0;
	display: flex;
	color: #666;

	i {
		transition: cubic(transform, 0.15s);
	}

	&.expanded {
		i {
			transform: rotate(90deg);
		}
	}
}
</style>
