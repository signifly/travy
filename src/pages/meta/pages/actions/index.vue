<template>
	<layout v-bind="{sidebar}">
		<section class="intro html" v-html="require('./intro.md')"/>
	</layout>
</template>

<script>
import layout from "@/pages/meta/layout.vue";

export default {
	components: {layout},
	data() {
		return {
			sidebar: {
				title: "Actions",
				sections: [
					[{value: "introduction", label: "Introduction"}]
				]
			}
		}
	}
};
</script>
