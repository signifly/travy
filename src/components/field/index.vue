<template>
	<div class="field" :class="{modifier: alt.modifier}" :style="{width: widthCalc}">

		<div class="content">
			<vlabel v-bind="{alt, name, label, tooltip}" v-if="rules.label"/>
			<fieldType v-bind="[fieldType, {alt}]" @fieldA="$emit('fieldA', $event)"/>
		</div>


		<div class="error" v-if="error">{{error}}</div>

		<div class="description" v-if="description && rules.description">
			<div class="title">Description:</div>
			<div class="text">{{description}}</div>
		</div>

	</div>
</template>

<script>
import {get} from "lodash";
import fieldType from "./field-type";
import vlabel from "./label";


export default {
	components: {vlabel, fieldType},
	props: {
		description: {type: String, required: false},
		fieldType: {type: Object, required: true},
		tooltip: {type: String, required: false},
		onClick: {type: String, required: false},
		label: {type: String, required: false},
		name: {type: String, required: true},
		width: {type: Number, default: 100},
		alt: {type: Object, required: true}
	},
	computed: {
		option: (t) => get(t.alt.options, t.name, {}),
		error: (t) => get(t.alt.errors, t.name, [])[0],
		
		widthCalc() {
			if (this.alt.modifier) {
				return this.width === 100 ? `calc(50% - 1em)` : `calc(${this.width}% - 1em)`;
			} else {
				return this.width === 100 ? `${this.width}%` : `calc(${this.width}% - 1em)`;
			}
		},

		rules() {
			const type = this.alt.type;

			return {
				label: type !== "table",
				dot: type === "view-tab",
				description: type === "view-tab"
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.field {
	margin: $fieldMargin 0;

	&.modifier {
		margin: 0;

		&:only-child {
			margin-left: auto;
		}

		.content {
			display: flex;
			align-items: center;
		}
	}

	.error {
		font-weight: 500;
		font-size: 0.75em;
		color: $danger;
		margin-top: 0.5em;
	}

	.description {
		margin-top: 1em;
		margin-bottom: 0.5em;
		font-size: em(13);
		display: flex;

		.title {
			font-weight: 500;
			margin-right: 1em;
			margin-top: -1px;
		}

		.text {
			font-style: italic;
			color: $blue4;
		}
	}
}
</style>
