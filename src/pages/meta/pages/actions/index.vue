<template>
	<section class="intro html" v-html="require('./intro.md')"/>
</template>

<script>

export default {
	created() {
		this.$emit("sidebar", {
			title: "Actions",
			sections: [
				[{value: "introduction", label: "Introduction"}]
			]
		});
	}
};
</script>
