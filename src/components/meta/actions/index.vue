<template>
	<vPage v-bind="{sidebar}">
		<section class="intro html" v-html="require('./intro.md')"/>
	</vPage>
</template>

<script>
import vPage from "../page.vue";

export default {
	components: {vPage},
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
