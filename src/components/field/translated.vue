<template>
	<div class="translated" v-if="translated">
		<Tooltip placement="right" effect="light" :disabled="!languages">
			<div class="icon" :class="{active: languages}" v-html="globe" />

			<div slot="content">
				<div class="item" v-for="item in translated" :key="item.label">
					<div class="icon"><img :src="icon(item.icon)"></div>
					{{item.label}}
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
	data() {
		return {
			globe: require("@/assets/icons/globe.svg")
		}
	},
	computed: {
		languages: (t) => t.translated.length
	},
	methods: {
		icon(file) {
			try {
				return require(`!file-loader!@/assets/icons/${file}.svg`);
			} catch(err) {
				console.log(err);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.translated {
	.icon {
		display: flex;
		align-items: center;

		&.active {
			/deep/ svg {
				path {
					fill: $blue5;
				}
			}
		}

		/deep/ svg {
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
	margin-bottom: 0.2em;

	&:last-child {
		margin-bottom: 0;
	}

	.icon {
		margin-right: 0.5em;
		img {
			width: 1.1em;
		}
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
