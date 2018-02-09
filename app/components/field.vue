<template>
	<div class="field">
		<div class="info" slot="info">
			<div class="label">{{label}}</div>
			<div class="tooltip" v-if="tooltip">
				<Tooltip :content="tooltip" placement="top">
					<i class="el-icon-info"></i>
				</Tooltip>
			</div>
		</div>
		<component
			v-if="comps[id]"
			:is="id"
			v-bind="propsData"
			:props="props"
			@fieldA="$emit('fieldA', $event)"
		/>
	</div>
</template>

<script>
import {mapValues, get} from "lodash";
import * as fields from "@/components/fields";
import {Tooltip} from "element-ui";

export default {
	components: {...fields, Tooltip},
	props: {
		fieldType: {type: Object, required: true},
		tooltip: {type: String, required: false},
		label: {type: String, required: true},
		data: {type: Object, default: () => ({})}
	},
	computed: {
		comps: (t) => t.$options.components,
		id: (t) => t.fieldType.id,
		props: (t) => t.fieldType.props,
		propsData: (t) => mapValues(t.props, (key) => get(t.data, key))
	}
};
</script>

<style lang="scss" scoped>
.field {
	margin-bottom: 1.25em;

	.info {
		display: flex;
		align-items: center;
		justify-content: space-between;

		color: $blue1;
		margin-bottom: 0.25em;

		.label {
			display: flex;
			align-items: center;
		}

		.tooltip {
			font-size: 0.8em;
			color: $blue3;
		}
	}
}
</style>
