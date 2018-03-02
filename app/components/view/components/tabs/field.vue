<template>
	<div class="field" :class="[id, {draggable}]">
		<div class="info" slot="info" v-if="info">
			<div class="label">
				{{label}}
				<transition name="el-fade-in">
					<span class="dot nodata" v-if="!disabled && nodata"></span>
				</transition>
			</div>
			<div class="tooltip" v-if="tooltip">
				<Tooltip :content="tooltip" placement="top">
					<i class="el-icon-info"></i>
				</Tooltip>
			</div>
		</div>

		<component
			v-if="components[id]"
			ref="field"
			:is="id"
			:unit="unit"
			:props="props"
			:rootData="data"
			:disabled="disabled"
			:meta="{location: 'tabs'}"
			v-bind="[propsData, propsValue]"
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
import {mapValues, mapKeys, map, get} from "lodash";
import {Tooltip, Tag} from "element-ui";
import * as fields from "@/components/fields";

export default {
	components: {Tooltip, Tag, ...fields},
	props: {
		field: {type: Object, required: true},
		data: {type: Object, required: true},
		draggable: {type: String, required: false},
		errors: {type: Object, required: false}
	},
	data() {
		return {
			mounted: false
		}
	},
	computed: {
		components: (t) => t.$options.components,
		name: (t) => t.field.name,
		label: (t) => t.field.label,
		id: (t) => t.field.fieldType.id,
		tooltip: (t) => t.field.tooltip,
		unit: (t) => t.field.fieldType.unit,
		disabled: (t) => t.field.fieldType.readonly,
		reference: (t) => t.field.fieldType.reference,
		opts: (t) => t.mounted ? get(t.$refs, "field.opts", {}) : {},
		error: (t) => get(t.errors, `data.${t.name}`, [])[0],

		props: (t) => t.field.fieldType.props,
		propsData: (t) => mapValues(t.props, (val) => get(t.data, val)),
		propsValue: (t) => mapKeys(t.props, (val, key) => `_${key}`),

		info() {
			if (this.draggable) return false;
			if (this.opts.label === false) return false;
			return true;
		},

		nodata() {
			if (!this.mounted) return;

			const field = get(this.$refs, "field", {});
			if (field.disabled) return false;

			const keys = map(field.data, (val, key) => key);
			return keys.map(key => this.propsData[key]).some(x => !x);
		}
	},
	mounted() {
		this.mounted = true;
	},
	watch: {
		nodata(bool) {
			this.$emit("nodata", {
				id: this.name,
				nodata: bool
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.field {
	width: 100%;
	margin-bottom: 1.5em;

	&.draggable {
		margin-bottom: 0;
	}

	.info {
		display: flex;
		align-items: center;
		justify-content: space-between;

		font-size: em(14);
		color: $blue4;
		margin-bottom: 0.5em;

		.label {
			display: flex;
			align-items: center;

			.dot {
				display: block;
				$s: 9px;
				width: $s;
				height: $s;
				border-radius: 50%;
				margin-left: 0.5em;

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
		}
		.text {
			font-style: italic;
			color: $blue4;
		}
	}

	&.vInputNumber {
		width: calc(50% - 1em);
	}
}
</style>
