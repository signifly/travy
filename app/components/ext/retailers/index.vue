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
			items: null
		}
	},
	methods: {
		async getData() {
			const {data: {data}} = await this.$http.get("retailers", {params: {sort: "name", count: 1000}});
			this.items = data;
		},

		async getTempData() {
			const {data} = await this.$http.get("https://api.npoint.io/3491cc163a58f4ae600b");
			this.items = data.map(x => ({
				id: Number(x.id),
				position: {lat: Number(x.lat), lng: Number(x.lng)}
			}));
		}
	},
	async created() {
		await this.getTempData();
	}
};
</script>

<style lang="scss" scoped>
.retailers {

}
</style>
