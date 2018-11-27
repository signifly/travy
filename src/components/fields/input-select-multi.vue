<template>
	<div class="select-multi">
		<Select
			v-bind="{size}"
			:value="values"
			:disabled="_disabled"
			:clearable="_clearable"
			:allow-create="_addable"
			:filterable="true"
			:multiple="true"
			@change="update">

			<Option v-for="item in itemsMap" v-bind="item" :key="item.value"/>

		</Select>
	</div>
</template>

<script>
import {get} from "lodash";
import {Select, Option} from "element-ui";

export default {
	components: {Select, Option},
	meta: {
		res: {
			props: {
				disabled: false,
				values: "selectValues",
				items: "selectOptions",
				options: {
					label: "name",
					value: "id"
				}
			},
			data: {
				selectValues: ["DK"],
				selectOptions: [
					{
						name: "Danmark",
						id: "DK",
					},
					{
						name: "England",
						id: "UK"
					},
					{
						name: "Murica",
						id: "US",
					}
				]
			}
		}
	},
	props: {
		_disabled: {type: Boolean, required: false, doc: true},
		meta: {type: Object, require: false, default: () => ({})},
		_clearable: {type: Boolean, required: false, default: true, doc: true},
		_addable: {type: Boolean, required: false, doc: true},
		_options: {type: Object, required: true, doc: true},
		values: {type: Array, required: false, doc: true},
		_values: {type: String, required: true},
		items: {type: Array, required: true, doc: true}
	},
	computed: {
		itemsMap: (t) => t.items.map(x => ({
			value: get(x, t._options.value),
			label: get(x, t._options.label)
		})),

		size() {
			if (this.meta.location === "table") return "small";
			if (this.meta.location === "tabs") return "medium";
			return "medium";
		}
	},
	methods: {
		update(val) {
			this.$emit("fieldA", {
				action: "update",
				data: {[this._values]: val}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.select-multi {
	.el-select {
		width: 100%;
	}
}
</style>
