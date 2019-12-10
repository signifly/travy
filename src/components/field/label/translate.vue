<template>
	<div class="translate" v-if="translated">
		<Tooltip placement="right" effect="light" :disabled="!languages">
			<div
				v-html="require('@/assets/icons/globe.svg')"
				:class="{active: languages}"
				class="icon"
			/>

			<div slot="content">
				<div class="item" v-for="(item, i) in translated" :key="i">
					{{ item.label }}
					<div class="outdated" v-if="item.outdated" />
				</div>
			</div>
		</Tooltip>
	</div>
</template>

<script>
import {Tooltip} from "element-ui";

export default {
	components: {Tooltip},
	props: {
		translated: {type: Array, required: false}
	},
	computed: {
		languages: (t) => t.translated.length
	}
};
</script>

<style lang="scss" scoped>
.translate {
	.icon {
		align-items: center;
		display: flex;

		&.active {
			::v-deep svg {
				path {
					fill: $blue5;
				}
			}
		}

		$s: 12px;

		::v-deep svg {
			display: block;
			height: $s;
			width: $s;

			path {
				fill: $blue4;
			}
		}
	}
}

.item {
	margin-bottom: 0.25em;
	align-items: center;
	display: flex;

	&:last-child {
		margin-bottom: 0;
	}

	$s: 8px;

	.outdated {
		background-color: $warning;
		border-radius: 50%;
		margin-left: 0.5em;
		display: block;
		height: $s;
		width: $s;
	}
}
</style>
