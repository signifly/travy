<template>
	<div class="field" v-if="!disabled">
		<div class="content">
			<vlabel v-bind="{alt, name, label, tooltip}" v-if="rules.label" />
			<fieldType v-bind="[fieldType, {alt}]" @event="$emit('event', $event)" />
		</div>

		<transition name="error">
			<div class="error" v-if="error">{{ error }}</div>
		</transition>

		<div class="description" v-if="description && rules.description">
			{{ description }}
		</div>
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
		description: {type: String, required: false},
		fieldType: {type: Object, required: true},
		tooltip: {type: String, required: false},
		onClick: {type: String, required: false},
		label: {type: String, required: false},
		hide: {type: Object, required: false},
		name: {type: String, required: true},
		alt: {type: Object, required: true}
	},
	computed: {
		option: (t) => get(t.alt.options, t.name, {}),
		error: (t) => get(t.alt.errors, t.name, [])[0],

		rules() {
			const type = this.alt.type;

			return {
				label: type !== "table",
				description: type === "view-tab"
			};
		},

		disabled() {
			if (this.hide) {
				return operator({...this.hide, data: this.alt.data});
			} else {
				return false;
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
