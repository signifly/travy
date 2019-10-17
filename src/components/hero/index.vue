<template>
	<transition name="hero" appear>
		<div class="hero" :style="{backgroundColor: theme.color}">
			<div class="container">
				<div class="wrap">
					<breadcrumbs v-if="breadcrumbs" />

					<div class="bottom">
						<div class="info">
							<div class="title" v-text="heroC.title" />
							<div class="sub" v-if="heroC.subtitle" v-text="heroC.subtitle" />
						</div>

						<div class="settings">
							<modifiers
								v-if="modifiers"
								v-bind="modifiers"
								@refresh="$emit('refresh')"
							/>

							<slot name="settings" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import {rStringProps} from "@/modules/utils";
import breadcrumbs from "./breadcrumbs";
import modifiers from "./modifiers";

export default {
	components: {breadcrumbs, modifiers},
	props: {
		breadcrumbs: {type: Array, required: false},
		modifiers: {type: Object, required: false},
		data: {type: Object, required: false},
		hero: {type: Object, required: true}
	},
	computed: {
		heroC: (t) => rStringProps({data: t.data, val: t.hero}),
		theme: (t) => t.$store.getters["config/theme"]
	}
};
</script>

<style lang="scss" scoped>
.hero {
	margin-bottom: -55px;

	&-enter-active,
	&-leave-active {
		transition: cubic(opacity, 0.05s);
	}

	&-enter,
	&-leave-to {
		opacity: 0;
	}

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

			.info {
				color: $white1;

				.title {
					font-size: 32px;
					font-weight: 700;
				}
				.sub {
					font-size: 20px;
					margin-top: 8px;
				}
			}

			.settings {
				display: flex;
				align-items: flex-end;
				flex-direction: column;
			}
		}
	}
}
</style>
