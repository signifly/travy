<template>
	<component v-if="comp" :is="comp" v-bind="{loading, title}" @refreshData="refreshData" @save="save"/>
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
		sequential: (t) => t.$route.query.sequential,
		title: (t) => `#${t.data.id}`,
		comp() {
			if (this.sequential) return batch;
			if (this.edit) return save;
		}
	},
	methods: {
		save(obj) {
			this.$emit("save", obj);
		},
		refreshData(obj) {
			this.$emit("refreshData", obj);
		}
	}
};
</script>

<style lang="scss" scoped>

</style>
