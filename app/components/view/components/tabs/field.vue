<template>
	<div class="field" :class="id">
		<div class="info" slot="info">
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
			ref="field"
			v-if="components[id]"
			:is="id"
			:props="props"
			:disabled="disabled"
			:unit="unit"
			v-bind="propsData"
			@update="$emit('update', $event)"
		/>

		<div class="reference" v-if="reference">
			<div class="title">Reference:</div>
			<div class="text">{{reference}}</div>
		</div>

	</div>
</template>

<script>
import {mapValues, map, get} from "lodash";
import {Tooltip, Tag} from "element-ui";
import * as fields from "@/components/fields";

export default {
	components: {
		Tooltip, Tag,
		...fields
	},
	props: {
		field: {type: Object, required: true},
		data: {type: Object, required: true}
	},
	data() {
		return {
			mounted: false
		}
	},
	computed: {
		components: (t) => t.$options.components,

		label: (t) => t.field.label,
		id: (t) => t.field.fieldType.id,
		tooltip: (t) => t.field.tooltip,
		disabled: (t) => t.field.fieldType.readonly,
		unit: (t) => t.field.fieldType.unit,
		reference: (t) => t.field.fieldType.reference,

		props: (t) => t.field.fieldType.props,
		propsData: (t) => mapValues(t.props, (key) => t.data[key]),

		nodata() {
			if (!this.mounted) return;

			const fieldData = get(this.$refs, "field.data");
			const keys = map(fieldData, (val, key) => key);
			return keys.map(key => this.propsData[key]).every(x => !x);
		}
	},
	mounted() {
		this.mounted = true;
	}
};
</script>

<style lang="scss" scoped>
.field {
	margin-bottom: 1.5em;

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
