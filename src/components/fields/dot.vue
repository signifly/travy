<template>
	<div class="dot" :style="{backgroundColor: color, fontSize: size}">
		<i :class="`el-icon-${icon}`" />
	</div>
</template>

<script>
export default {
	meta: {
		spec: "props",
		res: {
			props: {
				color: "red",
				icon: "eleme"
			}
		}
	},
	props: {
		color: {type: String, required: true},
		icon: {type: String, required: false},
		size: {type: String, default: "32px"}
	}
};
</script>

<style lang="scss" scoped>
.dot {
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	display: flex;
	color: white;
	height: 1em;
	width: 1em;
	overflow: hidden;

	i {
		font-size: 60%;
	}
}
</style>
