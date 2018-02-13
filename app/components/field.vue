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

		<div class="error" v-if="error">{{error}}</div>

	</div>
</template>

<script>
import {mapValues, get} from "lodash";
import * as fields from "@/components/fields";
import {Tooltip} from "element-ui";

export default {
	components: {...fields, Tooltip},
	props: {
		name: {type: String, required: true},
		fieldType: {type: Object, required: true},
		tooltip: {type: String, required: false},
		label: {type: String, required: true},
		errors: {type: Object, required: false},
		data: {type: Object, default: () => ({})}
	},
	computed: {
		comps: (t) => t.$options.components,
		id: (t) => t.fieldType.id,
		props: (t) => t.fieldType.props,
		propsData: (t) => mapValues(t.props, (val, key) => get(t.data, val, val)),
		error: (t) => get(t.errors, `${t.name}[0]`)
	}
};
</script>

<style lang="scss" scoped>
.field {
	margin: 1.25em 0;

	&:first-child {
		margin-top: 0;
	}

	&:last-child {
		margin-bottom: 0;
	}

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
}
</style>
