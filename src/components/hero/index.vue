<template>
	<div class="hero" :style="{backgroundColor: theme.color}">
		<div class="container">
			<div class="wrap">
				<breadcrumbs v-if="breadcrumbs" />

				<div class="bottom">
					<div class="title" v-text="title" />
					<modifiers
						v-if="modifiers"
						v-bind="modifiers"
						@refresh="$emit('refresh')"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import breadcrumbs from "./breadcrumbs";
import modifiers from "./modifiers";

export default {
	components: {breadcrumbs, modifiers},
	props: {
		breadcrumbs: {type: Array, required: false},
		modifiers: {type: Object, required: false},
		title: {type: String, required: true}
	},
	computed: {
		theme: (t) => t.$store.getters["config/theme"]
	}
};
</script>

<style lang="scss" scoped>
.hero {
	margin-bottom: -55px;
	color: $white1;

	.wrap {
		height: 250px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding-bottom: 85px;
		padding-top: 22px;

		.breadcrumbs {
			font-size: 13px;
		}

		.bottom {
			justify-content: space-between;
			align-items: flex-end;
			display: flex;
			height: 100%;

			.title {
				font-size: 32px;
				font-weight: 700;
			}
		}
	}
}
</style>
