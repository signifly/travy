<template>
	<GmapMarker
		:clickable="true"
		v-bind="{position}"
		:icon="require('@/assets/icons/marker.png')"
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
