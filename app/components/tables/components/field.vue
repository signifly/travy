<template>
	<component :is="link ? 'router-link' : 'div'" class="field" :to="link">
		<component
			:meta="{location: 'table'}"
			v-if="components[id]"
			:is="id"
			:props="props"
			v-bind="propsData"
			@fieldA="fieldA"
		/>
	</component>
</template>

<script>
import {mapValues, omit, get} from "lodash";
import * as fields from "@/components/fields";

export default {
	components: {...fields},
	props: {
		column: {type: Object, required: true},
		scope: {type: Object, required: true}
	},
	computed: {
		components: (t) => t.$options.components,
		id: (t) => t.column.fieldType.id,
		item: (t) => t.scope.row,
		action: (t) => t.column.fieldType.action,
		props: (t) => t.column.fieldType.props,
		propsData: (t) => mapValues(t.props, (key) => get(t.item, key)),

		link() {
			if (!this.action) return;
			const split = this.action.split("/");

			return split.map(item => {
				const start = item.indexOf("{");
				const end = item.indexOf("}");
				if (start === -1 && end === -1) return item;

				const key = item.substring(start + 1, end);

				return get(this.item, key);
			}).join("/");
		}
	},
	methods: {
		fieldA(obj) {
			this.$emit("fieldA", {...obj, item: this.item});
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
