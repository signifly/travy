<template>
	<div class="select-multi">
		<Select
			:allow-create="_addable"
			:clearable="_clearable"
			:disabled="_disabled"
			:filterable="true"
			:multiple="true"
			@change="update"
			:value="value"
		>
			<Option v-for="item in _entities" v-bind="item" :key="item.value" />
		</Select>
	</div>
</template>

<script>
import {Select, Option} from "element-ui";

export default {
	components: {Select, Option},
	meta: {
		spec: {
			_clearable: {type: Boolean, required: false, default: true},
			_disabled: {type: Boolean, required: false},
			_addable: {type: Boolean, required: false},
			value: {type: Array, required: false},
			_entities: {
				type: Array,
				required: true,
				children: {
					value: {type: [String, Number], required: true},
					label: {type: String, required: true}
				}
			}
		},
		res: {
			props: {
				value: "value",
				_entities: [
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
				value: ["uk"]
			}
		}
	},
	props: {
		_clearable: {type: Boolean, required: false, default: true},
		_disabled: {type: Boolean, required: false},
		_addable: {type: Boolean, required: false},
		_entities: {type: Array, required: true},
		value: {type: Array, required: false}
	},
	methods: {
		update(value) {
			this.$emit("event", {
				actions: {
					update: {data: {value}}
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
