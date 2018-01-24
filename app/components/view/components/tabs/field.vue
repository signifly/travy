<template>
	<div class="field">
		<div class="info">
			<div class="label">{{label}}</div>
			<div class="tooltip">{{tooltip}}</div>
		</div>
		<component :is="id" :props="props" v-bind="propsData" @update="$emit('update', $event)" />
	</div>
</template>

<script>
import {mapValues} from "lodash";
import * as fields from "@/components/fields";

export default {
	components: fields,
	props: {
		field: {type: Object, required: true},
		data: {type: Object, required: true}
	},
	computed: {
		components: (t) => t.$options.components,
		id: (t) => t.field.fieldType.id,
		label: (t) => t.field.label,
		tooltip: (t) => t.field.tooltip,
		props: (t) => t.field.fieldType.props,
		propsData: (t) => mapValues(t.props, (key) => t.data[key])
	}
};
</script>

<style lang="scss" scoped>
.field {

}
</style>
