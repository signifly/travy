<template>
	<div class="field" :style="{width: widthCalc}">

		<div class="wrap">
			<vlabel v-bind="{alt, name, label, tooltip}"/>
			<fieldType v-bind="[fieldType, {alt}]" @fieldA="$emit('fieldA', $event)"/>
		</div>


		<div class="error" v-if="error">{{error}}</div>

		<div class="description" v-if="description">
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
		type: (t) => t.alt.type,
		option: (t) => get(t.alt.options, t.name, {}),
		error: (t) => get(t.alt.errors, t.name, [])[0],
		widthCalc: (t) => t.width !== 100 ? `calc(${t.width}% - 1em)` : `${t.width}%`
	}
};
</script>

<style lang="scss" scoped>
.field {
	margin: $fieldMargin 0;

	.wrap {

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
