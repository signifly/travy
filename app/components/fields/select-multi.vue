<template>
	<div class="select-multi-add">
		<Select v-model="data.value" @change="update" v-bind="{size}" filterable multiple>
			<Option v-for="option in options" v-bind="option" :key="option.value" />
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
				value: "selectValue",
				options: "selectOptions"
			},
			data: {
				selectValue: [],
				selectOptions: [
					{
						label: "Danmark",
						value: "dk",
					},
					{
						label: "England",
						value: "UK"
					},
					{
						label: "Murica",
						value: "US",
					}
				]
			}
		}
	},
	props: {
		_meta: {type: Object, require: false, default: () => ({})},
		options: {type: Array, required: true},
		value: {type: Array, required: false},
		_value: {type: String, required: true}
	},
	data() {
		return {
			data: {
				value: this.value
			}
		}
	},
	computed: {
		size() {
			if (this._meta.location === "table") return "small";
			if (this._meta.location === "tabs") return "medium";
			return "medium";
		}
	},
	methods: {
		update(val) {
			this.$emit("fieldA", {
				action: "update",
				data: {[this._value]: val}
			});
		}
	}
}
</script>

<style lang="scss" scoped>
.select-multi-add {
	.el-select {
		width: 100%;
	}
}
</style>
