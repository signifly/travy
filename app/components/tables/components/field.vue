<template>
	<component :is="link ? 'router-link' : 'div'" class="field" :to="link">
		<component
			:meta="{location: 'table'}"
			v-if="components[id]"
			:is="id"
			v-bind="[propsData, propsValues, {props, data, endpoints}]"
			@fieldA="fieldA"
		/>
	</component>
</template>

<script>
import {mapValues, mapKeys, omit, get} from "lodash";
import * as fields from "@/components/fields";

export default {
	components: {...fields},
	props: {
		endpoints: {type: Object, required: true},
		column: {type: Object, required: true},
		scope: {type: Object, required: true}
	},
	computed: {
		components: (t) => t.$options.components,
		query: (t) => t.$route.query,
		id: (t) => t.column.fieldType.id,
		data: (t) => t.scope.row,
		action: (t) => t.column.fieldType.action,

		props: (t) => t.column.fieldType.props,
		propsData: (t) => mapValues(t.props, (val) => get(t.data, val)),
		propsValues: (t) => mapKeys(t.props, (val, key) => `_${key}`),

		link() {
			if (!this.action) return;
			const split = this.action.split("/");

			const url = split.map(item => {
				const start = item.indexOf("{");
				const end = item.indexOf("}");
				if (start === -1 && end === -1) return item;
				const key = item.substring(start + 1, end);
				return get(this.data, key);
			}).join("/");

			return {path: url, query: {modifiers: this.query.modifiers}};
		}
	},
	methods: {
		fieldA(obj) {
			this.$emit("fieldA", {...obj, item: this.data});
		}
	}
};
</script>

<style lang="scss" scoped>
.field {
	text-decoration: none;
	color: $black1;
}
</style>
