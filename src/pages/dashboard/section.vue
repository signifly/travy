<template>
	<div class="section" :style="{width: widthC}">
		<tabs :tabs="tabs" />
	</div>
</template>

<script>
import tabs from "@/components/tabs";

export default {
	components: {tabs},
	props: {
		tabs: {type: Array, required: true},
		width: {type: Number, required: false, default: 100}
	},
	computed: {
		widthC() {
			const width = this.width;
			return width === 100 ? `${width}%` : `calc(${width}% - 10px)`;
		}
	}
};
</script>

<style lang="scss" scoped>
.section {
	margin-bottom: 20px;
}
</style>
