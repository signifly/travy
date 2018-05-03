<template>
<div class="map">
	<template v-if="items">
		<GmapMap
			:center="{lat:55.45834601674558, lng:10.244126916259786}"
			:zoom="4"
			map-type-id="roadmap"
			style="width: 100%; height: 600px"
			v-bind="{options}"
		>

			<GmapCluster :zoomOnClick="true">
				<vMarker v-for="item in items" :key="item.id" v-bind="[item, {infoWindow}]" @open="open" />
			</GmapCluster>
		</GmapMap>
	</template>
</div>
</template>

<script>
import GmapCluster from "vue2-google-maps/dist/components/cluster";
import vMarker from "./marker.vue";


export default {
	components: {GmapCluster, vMarker},
	props: {
		items: {type: [Array], required: false}
	},
	data() {
		return {
			infoWindow: null,

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
	methods: {
		open(id) {
			this.infoWindow = id;
		}
	}
};
</script>

<style lang="scss" scoped>
.map {

}
</style>
