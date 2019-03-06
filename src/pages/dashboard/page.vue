<template>
	<div class="dashboard" v-if="definitions">
		<sections v-bind="{sections}"/>
	</div>
</template>

<script>
import sections from "./sections";

export default {
	components: {sections},
	props: {
		defsEndpoint: {type: Object, required: true}
	},
	data() {
		return {
			definitions: null
		}
	},
	computed: {
		sections: (t) => t.definitions.sections
	},
	methods: {
		async getDefinitions() {
			const {params, url} = this.defsEndpoint;
			const {data} = await this.$axios.get(url, params);
			this.definitions = data;
		},
	},
	created() {
		this.getDefinitions();
	}
};
</script>

<style lang="scss" scoped>
.dashboard {

}
</style>
