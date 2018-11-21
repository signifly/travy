<template>
	<component
		:is="comp"
		v-bind="[propsData, propsValue, {alt}]"
		@fieldA="$emit('fieldA', $event)"
	/>
</template>

<script>
import {get, mapKeys, mapValues} from "lodash";

export default {
	props: {
		id: {type: String, required: true},
		alt: {type: Object, required: false},
		props: {type: Object, required: true},
		disabled: {type: Boolean, required: false},
		description: {type: String, required: false}
	},
	computed: {
		data: (t) => t.alt.data,
		propsValue: (t) => mapKeys(t.props, (val, key) => `_${key}`),
		propsData: (t) => mapValues(t.props, (val) => get(t.data, val)),

		comp() {
			return () => import(/* webpackMode: "eager" */ `@/components/fields/${this.id}.vue`);
		}
	}
};
</script>

<style lang="scss" scoped>
.fieldType {

}
</style>
