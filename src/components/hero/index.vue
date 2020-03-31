<template>
	<div class="hero">
		<div class="container">
			<div class="wrap">
				<breadcrumbs :breadcrumbs="Hero.breadcrumbs" />

				<div class="bottom">
					<div class="info">
						<div class="title" v-text="Hero.title" />
						<div class="sub" v-if="Hero.subtitle" v-text="Hero.subtitle" />
					</div>

					<div class="settings">
						<modifiers
							@refresh="$emit('refresh')"
							v-bind="modifiers"
							v-if="modifiers"
						/>

						<div class="slot" v-if="$slots.settings">
							<slot name="settings" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {transProps} from "@/modules/utils";
import breadcrumbs from "./breadcrumbs";
import modifiers from "./modifiers";

export default {
	components: {breadcrumbs, modifiers},
	props: {
		modifiers: {type: Object, required: false},
		data: {type: Object, required: false},
		hero: {type: Object, required: true}
	},
	computed: {
		Hero: (t) => transProps({data: t.data, val: t.hero})
	}
};
</script>

<style lang="scss" scoped>
.hero {
	margin-bottom: -55px;

	.wrap {
		height: $heroHeight;
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

				.slot {
					margin-top: 1em;
				}
			}
		}
	}
}
</style>
