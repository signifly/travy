<template>
	<component v-if="active" :is="comp" v-bind="{loading, title}"/>
</template>

<script>
import save from "./save.vue";
import batch from "./batch.vue";

export default {
	components: {save, batch},
	props: {
		data: {type: Object, required: true},
		edit: {type: Boolean, required: true},
		loading: {type: Boolean, required: true}
	},
	computed: {
		title: (t) => `#${t.data.id}`,
		sequential: (t) => t.$route.query.sequential,
		comp: (t) => t.sequential ? "batch" : "save",
		active() {
			if (this.comp === "batch") return true;
			if (this.comp === "save") return this.edit;
		}
	},
	methods: {
		save() {
			this.$parent.$emit("save");
		}
	}
};
</script>

<style lang="scss" scoped>

</style>
