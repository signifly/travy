<template>
	<div class="field" :style="{width, margin}" v-if="!disabled">
		<div class="content">
			<vlabel v-bind="{field, options}" v-if="show.label" />

			<fieldType
				@event="$emit('event', $event)"
				v-bind="field.fieldType"
				:data="data"
			/>
		</div>

		<transition name="error">
			<div class="error" v-if="errorMsg" v-text="errorMsg" />
		</transition>

		<div
			class="description"
			v-if="field.description"
			v-text="field.description"
		/>
	</div>
</template>

<script>
import {operator} from "@/modules/utils";
import fieldType from "./field-type";
import vlabel from "./label";
import {get} from "lodash";

export default {
	components: {vlabel, fieldType},
	props: {
		widthPx: {type: Boolean, required: false},
		options: {type: Object, required: false},
		margin: {type: String, required: false},
		error: {type: Object, required: false},
		hide: {type: Array, default: () => []},
		field: {type: Object, required: true},
		data: {type: Object, required: false}
	},
	computed: {
		disabled: (t) => t.field.hide && operator({...t.field.hide, data: t.data}),
		errorMsg: (t) => get(t.error, ["errors", t.field.attribute, 0]),

		show() {
			return ["label"].reduce(
				(sum, rule) => ({
					...sum,
					[rule]: !this.hide.includes(rule)
				}),
				{}
			);
		},

		width() {
			const w = this.field.width || 100;

			if (this.widthPx) {
				return `${w}px`;
			} else {
				return w === 100 ? `${w}%` : `calc(${w}% - 1em)`;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.field {
	margin: $fieldMargin 0;

	.content {
		width: 100%;
	}

	.error {
		font-weight: 500;
		font-size: 0.75em;
		color: $danger;
		margin-top: 0.5em;
		height: 13px;

		&-enter-active,
		&-leave-active {
			$t: 0.4s;
			transition: cubic(opacity, $t), cubic(height, $t), cubic(margin, $t);
		}
		&-enter,
		&-leave-to {
			opacity: 0;
			height: 0;
			margin: 0;
		}
	}

	.description {
		margin-top: 0.6em;
		margin-bottom: 0.5em;
		font-size: em(12);
		font-style: italic;
		color: $blue4;
	}
}
</style>
