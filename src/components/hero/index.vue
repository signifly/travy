<template>
	<div class="hero" :style="{backgroundColor: config.theme.color}">
		<div class="container">
			<div class="wrap">
				<div class="breadcrumbs">
					path / stuff / test
				</div>

				<div class="bottom">
					<div class="title">
						hero
					</div>

					<modifiers v-bind="modifiers" @refresh="$emit('refresh')" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import modifiers from "./modifiers";

export default {
	components: {modifiers},
	props: {
		modifiers: {type: Object, required: true}
	},
	computed: {
		config: (t) => t.$store.getters["config/data"]
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
			display: flex;
			justify-content: space-between;
			align-items: flex-end;

			.title {
				font-size: 32px;
				font-weight: 700;
			}
		}
	}
}
</style>
