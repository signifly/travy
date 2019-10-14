<template>
	<div class="field" :style="{width: fWidth}" v-if="!disabled">
		<div class="content">
			<vlabel v-bind="{field, type}" v-if="rules.label" />
			<fieldType
				@event="$emit('event', $event)"
				v-bind="field.fieldType"
				:data="data"
			/>
		</div>

		<transition name="error">
			<div class="error" v-if="error" v-text="error" />
		</transition>

		<div
			class="description"
			v-if="field.description && rules.description"
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
		errors: {type: Object, required: false},
		field: {type: Object, required: true},
		data: {type: Object, required: false},
		type: {type: String, required: true}
	},
	computed: {
		error: (t) => get(t.errors, t.field.name, [])[0],
		disabled: (t) => t.field.hide && operator({...t.field.hide, data: t.data}),

		fWidth() {
			const w = this.field.width;

			if (this.type === "fields") {
				return w === 100 ? `${w}%` : `calc(${w}% - 1em)`;
			} else {
				return `${w}px`;
			}
		},

		rules: ({type}) => ({
			label: type === "fields",
			description: type === "fields"
		})
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
