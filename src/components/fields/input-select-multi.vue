<template>
	<div class="select-multi">
		<Select
			:allow-create="addable"
			:clearable="clearable"
			:disabled="disabled"
			:filterable="true"
			:multiple="true"
			@change="update"
			:value="value"
		>
			<Option v-for="item in entities" v-bind="item" :key="item.value" />
		</Select>
	</div>
</template>

<script>
import {Select, Option} from "element-ui";

export default {
	components: {Select, Option},
	meta: {
		spec: {
			clearable: {type: Boolean, required: false, default: true},
			disabled: {type: Boolean, required: false},
			addable: {type: Boolean, required: false},
			value: {type: Array, required: true},
			entities: {
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
				value: "{value}",
				entities: [
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
		disabled: {type: Boolean, required: false},
		clearable: {type: Boolean, default: true},
		addable: {type: Boolean, required: false},
		entities: {type: Array, required: true},
		value: {type: Array, required: true}
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
