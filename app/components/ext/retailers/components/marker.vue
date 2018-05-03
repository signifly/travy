<template>
	<GmapMarker
		:clickable="true"
		v-bind="{position, icon}"
		@click="toggle"
	>

		<GmapInfoWindow v-if="popup === id">
			<div class="popup">
				<div class="name">{{name}}</div>

				<div class="info">
					<div class="location">
						<div class="location1">{{location1}}</div>
						<div class="location2">{{location2}}</div>
					</div>
					<div class="phone" v-if="phone">Phone: <a :href="phoneLink">{{phone}}</a></div>
					<div class="email" v-if="email">Email: <a :href="emailLink">{{email}}</a></div>
					<div class="website" v-if="website">Website: <a :href="websiteLink" target="_blank">{{website}}</a></div>
				</div>
			</div>
		</GmapInfoWindow>
	</GmapMarker>
</template>

<script>
export default {
	props: {
		popup: {type: Number, required: false},
		id: {type: Number, required: true},
		position: {type: Object, required: true},
		name: {type: String, required: true},
		email: {type: String, required: true},
		phone: {type: String, required: true},
		address: {type: String, required: true},
		address2: {type: String, required: true},
		city: {type: String, required: true},
		zip_code: {type: String, required: true},
		website: {type: String, required: true}
	},
	data() {
		return {
			icon: this.$host + require("../../assets/icons/marker.png")
		}
	},
	computed: {
		emailLink: (t) => `mailto:${t.email}`,
		phoneLink: (t) => `tel:${t.phone.split(" ").join("")}`,
		websiteLink: (t) => t.website.startsWith("http") ? t.website : `http://${t.website}`,

		location1() {
			return [this.address, this.address2].filter(x => x).join(", ");
		},
		location2() {
			return [this.city, this.zip_code].filter(x => x).join(", ");
		}
	},
	methods: {
		toggle() {
			this.$emit("toggle", this.id);
		}
	}
};
</script>

<style lang="scss" scoped>
.popup {
	font-family: $font1;
	font-weight: 400;
	margin-top: 0.5em;

	.name {
		font-size: 1.1em;
		font-weight: 600;
		margin-bottom: 0.5em;
	}

	.info {
		> div {
			margin: 0.5em 0;

			a {
				color: $blue4;
			}
		}

		.location {
			.location1 {
				margin-bottom: 0.2em;
			}
		}
	}
}
</style>
