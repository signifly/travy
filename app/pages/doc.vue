<template>
	<vDoc />
</template>

<script>
const vDoc = () => import(/* webpackChunkName: "doc" */ "@/components/doc/index.vue");

export default {
	components: {vDoc}
};
</script>
