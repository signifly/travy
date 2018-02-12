<template>
	<component :is="comp" v-bind="{loading, seq}" />
</template>

<script>
import vSave from "./save.vue";
import vBatch from "./batch.vue";

export default {
	components: {vSave, vBatch},
	props: {
		loading: {type: Boolean, required: true}
	},
	computed: {
		seq: (t) => t.$route.query.seq,
		comp: (t) => t.seq ? "vBatch" : "vSave"
	},
	methods: {
		save() {
			this.$parent.$emit("save", {
				done: () => {
					console.log("done");
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>

</style>
