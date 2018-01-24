<template>
	<div class="page">
		<div class="title">{{page.title}}</div>

		<div class="sectoins">
			<vSection v-for="section in sections" :key="section.title" v-bind="{section, data}" @update="$emit('update', $event)"/>
		</div>
	</div>
</template>

<script>
import vSection from "./section.vue";

export default {
	components: {vSection},
	props: {
		page: {type: Object, required: true},
		data: {type: Object, required: true}
	},
	computed: {
		sections: (t) => t.page.sections
	}
};
</script>

<style lang="scss" scoped>
.page {
	.title {
		margin-bottom: 1.5em;
	}
}
</style>
