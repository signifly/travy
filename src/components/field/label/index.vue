<template>
	<div class="label" v-if="field.name">
		{{ field.name }}

		<translate v-bind="option" />

		<transition name="el-fade-in">
			<div class="dot outdated" v-if="option.outdated" />
		</transition>

		<div class="tooltip" v-if="tooltip">
			<Tooltip :content="tooltip" placement="top">
				<i class="el-icon-info" />
			</Tooltip>
		</div>
	</div>
</template>

<script>
import {get} from "lodash";
import {Tooltip} from "element-ui";
import translate from "./translate";

export default {
	components: {Tooltip, translate},
	props: {
		tooltip: {type: String, required: false},
		field: {type: Object, required: true}
	},
	computed: {
		option: (t) => get(t.options, t.field.name, {})
	}
};
</script>

<style lang="scss" scoped>
.label {
	display: flex;
	align-items: center;
	margin-bottom: 0.5em;
	font-size: 0.875em;
	color: $blue4;
	white-space: nowrap;

	.field.modifiers & {
		margin-bottom: 0;
		margin-right: 1em;
	}

	> div {
		margin-left: 0.5em;
	}

	.dot {
		display: block;
		$s: 9px;
		width: $s;
		height: $s;
		border-radius: 50%;

		&.outdated {
			background-color: $warning;
		}
	}

	.tooltip {
		font-size: 0.8em;
		color: $blue3;
	}
}
</style>
