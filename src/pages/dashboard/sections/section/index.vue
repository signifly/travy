<template>
	<div class="section" :style="{width: widthCalc}">
		<component :is="comp" v-bind="section"/>
	</div>
</template>

<script>
export default {
	props: {
		section: {type: Object, required: true}
	},
	computed: {
		widthCalc: (t) => t.width === 100 ? `${t.width}%` : `calc(${t.width}% - 1em)`,
		width: (t) => t.section.width || 50,
		type: (t) => t.section.type,
		comp() {
			return () => import(/* webpackMode: "eager" */ `./${this.type}.vue`);
		}
	}
};
</script>

<style lang="scss" scoped>
.section {
	padding: 1em 0;
}
</style>
