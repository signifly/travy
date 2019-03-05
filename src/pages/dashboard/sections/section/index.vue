<template>
	<div class="section" :style="{width: widthCalc}">
		<div class="wrap">
			<component :is="comp" v-bind="section"/>
		</div>
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
	padding: 24px;

	.wrap {
		background-color: $white1;
		padding: 1em;
	}
}
</style>
