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
			const {data: {data}} = await this.$http.get("retailers", {params: {sort: "name", count: 1000}});

			this.items = data.filter(x => x.longitude && x.latitude)
			.map(x => ({
				...x,
				position: {lat: x.latitude, lng: x.longitude}
			}));
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
