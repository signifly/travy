<template>
	<div class="translate" v-if="translated">
		<Tooltip placement="right" effect="light" :disabled="!languages">
			<div
				class="icon"
				:class="{active: languages}"
				v-html="require('@/assets/icons/globe.svg')"
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
		display: flex;
		align-items: center;

		&.active {
			::v-deep svg {
				path {
					fill: $blue5;
				}
			}
		}

		::v-deep svg {
			$s: 12px;
			display: block;
			width: $s;
			height: $s;

			path {
				fill: $blue4;
			}
		}
	}
}

.item {
	display: flex;
	align-items: center;
	margin-bottom: 0.25em;

	&:last-child {
		margin-bottom: 0;
	}

	.outdated {
		margin-left: 0.5em;
		display: block;
		$s: 8px;
		width: $s;
		height: $s;
		border-radius: 50%;
		background-color: $warning;
	}
}
</style>
