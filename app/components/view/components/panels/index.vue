<template>
	<component v-if="active" :is="comp" v-bind="{id, loading, title, seq}" />
</template>

<script>
import {map} from "lodash";
import vSave from "./save.vue";
import vBatch from "./batch.vue";

export default {
	components: {vSave, vBatch},
	props: {
		id: {type: Number, required: true},
		title: {type: String, required: true},
		loading: {type: Boolean, required: true},
		edited: {type: Boolean, required: true}
	},
	computed: {
		seq: (t) => map(t.$route.query.seq, (val) => Number(val)), // make sure seq is an array
		active: (t) => t.edited || t.seq.length > 0,
		comp: (t) => t.seq ? "vBatch" : "vSave"
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
