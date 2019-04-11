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

			<Option v-for="item in _items" v-bind="item" :key="item.value"/>

		</Select>
	</div>
</template>

<script>
import {Select, Option} from "element-ui";

export default {
	components: {Select, Option},
	meta: {
		res: {
			props: {
				disabled: false,
				values: "selectValues",
				items: [
					{
						label: "Danmark",
						value: "dk"
					},
					{
						label: "England",
						value: "uk"
					},
					{
						label: "Murica",
						value: "us"
					}
				]
			},
			data: {
				selectValues: ["uk"]
			}
		}
	},
	props: {
		meta: {type: Object, require: false, default: () => ({})},
		_disabled: {type: Boolean, required: false, doc: true},
		_clearable: {type: Boolean, required: false, default: true, doc: true},
		_addable: {type: Boolean, required: false, doc: true},
		values: {type: Array, required: false, doc: true},
		_values: {type: String, required: true},
		_items: {type: Array, required: true, doc: true}
	},
	computed: {
		size() {
			if (this.meta.location === "table") return "small";
			if (this.meta.location === "tabs") return "medium";
			return "medium";
		}
	},
	methods: {
		update(values) {
			this.$emit("event", {
				actions: {
					update: {data: {[this._values]: values}}
				}
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
