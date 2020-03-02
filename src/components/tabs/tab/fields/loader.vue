<template>
	<div class="loader">
		<ContentLoader :height="155">
			<!-- group -->
			<rect x="0" y="0" width="60" v-bind="label" />
			<rect x="0" y="10" width="calc(50% - 1em)" v-bind="field" />

			<rect x="50%" y="0" width="60" v-bind="label" />
			<rect x="50%" y="10" width="calc(50% - 1em)" v-bind="field" />

			<!-- group -->
			<rect x="0" y="40" width="60" v-bind="label" />
			<rect x="0" y="50" width="calc(33% - 1em)" v-bind="field" />

			<rect x="33.3%" y="40" width="60" v-bind="label" />
			<rect x="33.3%" y="50" width="calc(33% - 1em)" v-bind="field" />

			<rect x="66.6%" y="40" width="60" v-bind="label" />
			<rect x="66.6%" y="50" width="calc(33% - 1em)" v-bind="field" />

			<!-- group -->
			<rect x="0" y="80" width="60" v-bind="label" />
			<rect x="0" y="90" width="calc(100% - 1em)" v-bind="field" height="60" />
		</ContentLoader>
	</div>
</template>

<script>
import {ContentLoader} from "vue-content-loader";

export default {
	components: {ContentLoader},
	data: () => ({
		label: {
			height: 5,
			rx: 4,
			ry: 4
		},
		field: {
			height: 15,
			rx: 4,
			ry: 4
		}
	})
};
</script>

<style lang="scss" scoped>
.loader {
	margin: 1.5em;
}
</style>
