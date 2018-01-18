<template>
	<router-link v-if="action" class="text" :to="action">{{text}}</router-link>
	<div class="text" v-else>{{text}}</div>
</template>

<script>
export default {
	props: {
		text: {type: String, required: true},
		action: {type: String, required: false}
	}
};
</script>

<style lang="scss" scoped>
.text {
	display: block;
	color: $black1;
	text-decoration: none;
	font-weight: 600;
}
</style>
