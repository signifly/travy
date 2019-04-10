<template>
	<transition name="el-zoom-in-bottom">
		<component
			v-if="comp"
			:is="comp"
			v-bind="{loading, error, title}"
			@event="$emit('event', $event)"
			@save="$emit('save', $event)"
		/>
	</transition>
</template>

<script>
import save from "./save.vue";
import batch from "./batch.vue";

export default {
	components: {save, batch},
	props: {
		data: {type: Object, required: true},
		edit: {type: Boolean, required: true},
		error: {type: String, required: true},
		loading: {type: Boolean, required: true}
	},
	computed: {
		sequential: (t) => t.$route.query.sequential,
		title: (t) => `#${t.data.id}`,
		comp() {
			if (this.sequential) return batch;
			if (this.edit) return save;
		}
	}
};
</script>

<style lang="scss" scoped>

</style>
