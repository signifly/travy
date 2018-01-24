<template>
	<div class="field" :class="id">
		<div class="info" slot="info">
			<div class="label">{{label}}</div>
			<div class="tooltip" v-if="tooltip">
				<Tooltip :content="tooltip" placement="top">
					<i class="el-icon-info"></i>
				</Tooltip>
			</div>
		</div>

		<component
			:is="id"
			:props="props"
			v-bind="propsData"
			:disabled="disabled"
			:unit="unit"
			@update="$emit('update', $event)"
		/>

	</div>
</template>

<script>
import {mapValues} from "lodash";
import * as fields from "@/components/fields";
import {Tooltip} from "element-ui";

export default {
	components: {
		...fields,
		Tooltip
	},
	props: {
		field: {type: Object, required: true},
		data: {type: Object, required: true}
	},
	computed: {
		components: (t) => t.$options.components,

		label: (t) => t.field.label,
		id: (t) => t.field.fieldType.id,
		tooltip: (t) => t.field.tooltip,
		disabled: (t) => t.field.fieldType.readonly,
		unit: (t) => t.field.fieldType.unit,

		props: (t) => t.field.fieldType.props,
		propsData: (t) => mapValues(t.props, (key) => t.data[key])
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

		.tooltip {
			font-size: 0.8em;
			color: $blue3;
		}
	}
	&.vInputNumber {
		width: calc(50% - 1em);
	}
}
</style>
