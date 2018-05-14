<template>
<div class="retailers">
	<vMap v-bind="{items}"/>
</div>
</template>

<script>
import vMap from "./components/map.vue";

export default {
	components: {vMap},
	data() {
		return {
			items: []
		}
	},
	methods: {
		async getData() {
			const {data: {data}} = await this.$http.get("retailers", {params: {count: 10000}});
			this.items = data.filter(x => x.longitude && x.latitude);
		}
	},
	async created() {
		await this.getData();
	}
};
</script>

<style lang="scss" scoped>
.retailers {

}
</style>
