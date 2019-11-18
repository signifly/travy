<template>
	<transition name="el-zoom-in-bottom">
		<component
			v-if="comp"
			:is="comp"
			v-bind="{loading, title, errorMsg, edit}"
			@event="$emit('event', $event)"
			@save="$emit('save', $event)"
		/>
	</transition>
</template>

<script>
import sequential from "./sequential.vue";
import save from "./save.vue";
import {get} from "lodash";

export default {
	components: {save, sequential},
	props: {
		data: {type: Object, required: true},
		edits: {type: Object, required: true},
		error: {type: Object, required: false},
		loading: {type: Boolean, required: true}
	},
	computed: {
		edit: (t) => Object.values(t.edits).some((x) => x),
		errorMsg: (t) => get(t.error, "message", ""),
		seq: (t) => t.$route.query.seq,
		title: (t) => `#${t.data.id}`,
		comp() {
			if (this.seq) return sequential;
			if (this.edit) return save;
			return "";
		}
	}
};
</script>
