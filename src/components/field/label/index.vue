<template>
	<div class="label" v-if="label && rule.show">
		{{label}}

		<translate v-bind="option"/>

		<!-- <transition name="el-fade-in">
			<div class="dot outdated" v-if="rule.dot && !disabled && outdated"/>
		</transition> -->

		<div class="tooltip" v-if="tooltip">
			<Tooltip :content="tooltip" placement="top">
				<i class="el-icon-info"/>
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
		alt: {type: Object, required: false},
		name: {type: String, required: false},
		label: {type: String, required: false},
		tooltip: {type: String, required: false}
	},
	computed: {
		option: (t) => get(t.alt.options, t.name, {}),

		rule() {
			const type = this.alt.type;

			return {
				get show() {
					return type !== "table";
				},
				get dot() {
					return type === "view-tab";
				}
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.label {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 0.5em;
	font-size: 0.875em;
	color: $blue4;

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
