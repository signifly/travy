<template>
<div class="map">
	<GmapMap
	ref="map"
	:center="{lat:35, lng:-97.380979}"
	style="width: 100%; height: 600px"
	map-type-id="roadmap"
	v-bind="{options}"
	:zoom="4">

		<GmapCluster :zoomOnClick="true">
			<vMarker v-for="item in itemsFilter" :key="item.id" v-bind="[item, {popup}]" @toggle="toggle" />
		</GmapCluster>
	</GmapMap>

	<vFilter v-bind="{items, loaded}" :type.sync="type"/>
	<vSearch v-bind="{loaded}" @search="search"/>
</div>
</template>

<script>
import GmapCluster from "vue2-google-maps/dist/components/cluster";
import vMarker from "./marker.vue";
import vSearch from "./search.vue";
import vFilter from "./filter.vue";

export default {
	components: {GmapCluster, vMarker, vSearch, vFilter},
	props: {
		items: {type: Array, required: false}
	},
	data() {
		return {
			popup: null,
			type: "all",

			options: {
				styles: [{
						featureType: "administrative",
						elementType: "labels.text.fill",
						stylers: [
							{color: "#444444"}
						]
					},
					{
						featureType: "landscape",
						elementType: "all",
						stylers: [
							{color: "#f2f2f2"}
						]
					},
					{
						featureType: "poi",
						elementType: "all",
						stylers: [
							{visibility: "off"}
						]
					},
					{
						featureType: "road",
						elementType: "all",
						stylers: [
							{saturation: -100},
							{lightness: 45}
						]
					},
					{
						featureType: "road.highway",
						elementType: "all",
						stylers: [
							{visibility: "simplified"}
						]
					},
					{
						featureType: "road.arterial",
						elementType: "labels.icon",
						stylers: [
							{visibility: "off"}
						]
					},
					{
						featureType: "transit",
						elementType: "all",
						stylers: [
							{visibility: "off"}
						]
					},
					{
						featureType: "water",
						elementType: "all",
						stylers: [
							{color: "#4f595d"},
							{visibility: "on"}
						]
					}
				]
			}
		}
	},
	computed: {
		loaded: (t) => t.items.length > 0,

		itemsFilter() {
			return this.type === "all" ? this.items : this.items.filter(item => {
				return item.type.id === this.type;
			});
		}
	},
	methods: {
		toggle(id) {
			this.popup = this.popup === id ? this.popup = null : this.popup = id;
		},
		search(place) {
			if (!place || !place.geometry) return;
			this.$refs.map.$mapObject.fitBounds(place.geometry.viewport);
		}
	}
};
</script>

<style lang="scss" scoped>
.map {
	position: relative;
}
</style>
