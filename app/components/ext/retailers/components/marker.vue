<template>
	<GmapMarker
		:clickable="true"
		v-bind="{position, icon}"
		@click="open"
	>

		<GmapInfoWindow v-if="infoWindow === id">
			<div class="popup">
				<div class="name">Name</div>
			</div>
		</GmapInfoWindow>
	</GmapMarker>
</template>

<script>
export default {
	props: {
		infoWindow: {type: Number, required: false},
		position: {type: Object, required: true},
		id: {type: Number, required: true}
	},
	data() {
		return {
			icon: this.$host + require("../../assets/icons/marker.png")
		}
	},
	methods: {
		open() {
			this.$emit("open", this.id);
		}
	}
};
</script>

<style lang="scss" scoped>
.popup {

}
</style>
