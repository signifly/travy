<template>
	<transition name="el-zoom-in-bottom">
		<component
			v-if="comp"
			:is="comp"
			v-bind="{loading, title, errorMsg}"
			@event="$emit('event', $event)"
			@save="$emit('save', $event)"
		/>
	</transition>
</template>

<script>
import batch from "./batch.vue";
import save from "./save.vue";
import {get} from "lodash";

export default {
	components: {save, batch},
	props: {
		data: {type: Object, required: true},
		edits: {type: Object, required: true},
		error: {type: Object, required: false},
		loading: {type: Boolean, required: true}
	},
	computed: {
		edit: (t) => Object.values(t.edits).some((x) => x),
		errorMsg: (t) => get(t.error, "message", ""),
		sequential: (t) => t.$route.query.sequential,
		title: (t) => `#${t.data.id}`,
		comp() {
			if (this.sequential) return batch;
			if (this.edit) return save;
			return "";
		}
	}
};
</script>

<style lang="scss" scoped></style>
