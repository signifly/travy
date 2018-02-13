<template>
	<component v-if="active" :is="comp" v-bind="{loading, title, seq, getData}" />
</template>

<script>
import {map} from "lodash";
import vSave from "./save.vue";
import vBatch from "./batch.vue";

export default {
	components: {vSave, vBatch},
	props: {
		title: {type: String, required: true},
		loading: {type: Boolean, required: true},
		edited: {type: Boolean, required: true},
		getData: {type: Function, required: true}
	},
	computed: {
		seq: (t) => t.$route.query.seq,
		comp: (t) => t.seq ? "vBatch" : "vSave",
		active() {
			if (this.comp === "vBatch") return true;
			if (this.comp === "vSave") return this.edited;
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
