<template>
	<div class="fieldType">
		<component
			:is="comp"
			v-bind="[propsData, propsValue, {alt}]"
			@fieldA="$emit('fieldA', $event)"
		/>
	</div>
</template>

<script>
import {get, mapKeys, mapValues} from "lodash";
import {FormItem} from "element-ui";

export default {
	components: {FormItem},
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
			const customField = this.$settings.fields[this.id];

			if (customField) {
				return customField;
			} else {
				return () => import(/* webpackMode: "eager" */ `@/components/fields/${this.id}.vue`);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.fieldType {
	width: 100%;
}
</style>
