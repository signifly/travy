<template>
	<div class="select-multi">
		<Select
			:allow-create="_addable"
			:clearable="_clearable"
			:disabled="_disabled"
			:filterable="true"
			:multiple="true"
			@change="update"
			:value="values"
		>
			<Option v-for="item in _items" v-bind="item" :key="item.value" />
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
				_disabled: false,
				_clearable: false,
				values: "selectValues",
				_items: [
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
						disabled: true,
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
		_clearable: {type: Boolean, required: false, default: true},
		_disabled: {type: Boolean, required: false},
		_addable: {type: Boolean, required: false},
		values: {type: Array, required: false},
		_items: {type: Array, required: true}
	},
	methods: {
		update(values) {
			this.$emit("event", {
				actions: {
					update: {data: {values}}
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
