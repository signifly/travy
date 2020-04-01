<template>
	<div class="field" :style="{width, margin}" v-if="!disabled">
		<div class="content">
			<vlabel v-bind="{field, options, attributes}" v-if="show.label" />

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
			v-if="field.description && show.description"
			v-text="field.description"
			class="description"
		/>
	</div>
</template>

<script>
import {operator, getMapKey} from "@/modules/utils";
import fieldType from "./field-type";
import vlabel from "./label";
import {get} from "lodash";

export default {
	components: {vlabel, fieldType},
	props: {
		options: {type: Object, required: false},
		margin: {type: String, required: false},
		error: {type: Object, required: false},
		hide: {type: Array, default: () => []},
		field: {type: Object, required: true},
		data: {type: Object, required: false}
	},
	computed: {
		disabled: (t) => t.field.hide && operator({...t.field.hide, data: t.data}),
		errors: (t) => get(t.error, "errors", {}),
		props: (t) => t.field.fieldType.props,
		attributes() {
			// find all mapped attributes for field, {key} is an attribute
			return Object.entries(this.props)
				.map(([, val]) => getMapKey(val))
				.filter((x) => x);
		},
		errorMsg() {
			// find first message for first attribute
			return this.attributes
				.map((attr) => get(this.errors, [attr, 0]))
				.filter((x) => x)[0];
		},

		show() {
			return ["description", "label"].reduce(
				(sum, rule) => ({
					...sum,
					[rule]: !this.hide.includes(rule)
				}),
				{}
			);
		},

		width() {
			const w = this.field.width || 100;
			return w === 100 ? `${w}%` : `calc(${w}% - 1em)`;
		}
	}
};
</script>

<style lang="scss" scoped>
.field {
	margin: $fieldMargin 0;
	align-items: center;
	display: flex;

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
