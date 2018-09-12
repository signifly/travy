<template>
	<component v-if="active" :is="comp" v-bind="{loading, title, getData, error}" />
</template>

<script>
import {map} from "lodash";
import vSave from "./save.vue";
import vBatch from "./batch.vue";

export default {
	components: {vSave, vBatch},
	props: {
		data: {type: Object, required: true},
		loading: {type: Boolean, required: true},
		editsU: {type: Number, required: true},
		getData: {type: Function, required: true},
		error: {type: Object, required: true}
	},
	computed: {
		title: (t) => `#${t.data.id}`,
		sequential: (t) => t.$route.query.sequential,
		comp: (t) => t.sequential ? "vBatch" : "vSave",
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
