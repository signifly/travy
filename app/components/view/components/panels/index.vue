<template>
	<component v-if="active" :is="comp" v-bind="{loading, title, seq, getData, error}" />
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
		editsU: {type: Number, required: true},
		getData: {type: Function, required: true},
		error: {type: Object, required: true}
	},
	computed: {
		seq: (t) => t.$route.query.seq,
		comp: (t) => t.seq ? "vBatch" : "vSave",
		active() {
			if (this.comp === "vBatch") return true;
			if (this.comp === "vSave") return this.editsU;
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
