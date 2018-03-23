<template>
	<div class="tab">
		<div class="title">{{tab.title}}</div>

		<div class="sections">
			<vSection v-for="section in sections" :key="section.title" v-bind="{section, data, options, errors}" @fieldA="fieldA" ref="section"/>
		</div>
	</div>
</template>

<script>
import vSection from "./section.vue";

export default {
	components: {vSection},
	props: {
		tab: {type: Object, required: true},
		data: {type: Object, required: true},
		options: {type: Object, required: false},
		errors: {type: Object, required: false}
	},
	computed: {
		sections: (t) => t.tab.sections
	},
	methods: {
		fieldA(obj) {
			this.$emit("fieldA", {...obj, tab: this.tab.id});
		}
	}
};
</script>

<style lang="scss" scoped>
.tab {
	.title {
		margin-bottom: 1.5em;
	}
}
</style>
