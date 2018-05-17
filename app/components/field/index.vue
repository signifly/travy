<template>
	<div class="field" :style="{width}" v-if="show">
		<div class="info" slot="info" v-if="rule.info && label">
			<slot name="label">
				<div class="label" v-if="label">
					{{label}}

					<vTranslated v-bind="option" />

					<transition name="el-fade-in">
						<div class="dot outdated" v-if="rule.dot && !disabled && outdated" />
					</transition>

					<transition name="el-fade-in">
						<div class="dot nodata" v-if="rule.dot && !disabled && nodata" />
					</transition>

				</div>
			</slot>
			<div class="tooltip" v-if="tooltip">
				<Tooltip :content="tooltip" placement="top">
					<i class="el-icon-info"></i>
				</Tooltip>
			</div>
		</div>

		<component
			v-if="comps[id]"
			:is="id"
			ref="field"
			v-bind="[propsData, propsValue]"
			:alt="alt"
			:disabled="disabled"
			@fieldA="$emit('fieldA', $event)"
		/>

		<div class="error" v-if="error">{{error}}</div>

		<div class="reference" v-if="reference">
			<div class="title">Reference:</div>
			<div class="text">{{reference}}</div>
		</div>

	</div>
</template>

<script>
import {mapValues, mapKeys, get} from "lodash";
import {Tooltip} from "element-ui";
import * as fields from "@/components/fields";
import vTranslated from "./translated.vue";

export default {
	components: {...fields, vTranslated, Tooltip},
	props: {
		alt: {type: Object, required: true},
		name: {type: String, required: true},
		fieldType: {type: Object, required: true},
		tooltip: {type: String, required: false},
		label: {type: String, required: false}
	},
	data() {
		return {
			mounted: false
		}
	},
	computed: {
		error: (t) => get(t.alt.errors, `data.${t.name}`, [])[0],
		comps: (t) => t.$options.components,

		type: (t) => t.alt.type,
		id: (t) => t.fieldType.id,
		disabled: (t) => t.fieldType.readonly,
		reference: (t) => t.fieldType.reference,
		option: (t) => get(t.alt.options, t.name, {}),
		show: (t) => get(t.alt.data, t.fieldType.show, true),

		width() {
			const width = this.fieldType.width || 100;
			return width <= 50 ? `calc(${width}% - 1em)` : `${width}%`;
		},

		props: (t) => t.fieldType.props,
		propsValue: (t) => mapKeys(t.props, (val, key) => `_${key}`),
		propsData: (t) => mapValues(t.props, (val) => get(t.alt.data, val)),

		outdated: (t) => t.option.outdated,

		nodata() {
			const field = this.mounted ? this.$refs.field : {};
			return field.disabled ? false : field.nodata;
		},

		rule() {
			const type = this.type;

			return {
				get info() {
					return type !== "table";
				},
				get dot() {
					return type === "view-tab";
				}
			}
		}
	},
	mounted() {
		this.mounted = true;
	}
};
</script>

<style lang="scss" scoped>
.field {
	margin: $fieldMargin 0;

	.info {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.5em;
		font-size: 0.875em;
		color: $blue4;

		.label {
			display: flex;
			align-items: center;

			div {
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
				&.nodata {
					background-color: $danger;
				}
			}
		}

		.tooltip {
			font-size: 0.8em;
			color: $blue3;
		}
	}

	.error {
		font-weight: 500;
		font-size: 0.75em;
		color: $danger;
		margin-top: 0.5em;
	}

	.reference {
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
