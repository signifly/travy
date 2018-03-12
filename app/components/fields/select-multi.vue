<template>
	<div class="select-multi">
		<Select v-model="data.values" @change="update" v-bind="{size, disabled}" :clearable="_clearable" filterable multiple>
			<Option v-for="option in listMap" v-bind="option" :key="option.value" />
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
				values: "selectValues",
				list: "selectOptions",
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
		disabled: {type: Boolean, required: false},
		meta: {type: Object, require: false, default: () => ({})},
		_clearable: {type: Boolean, required: false, default: true, doc: true},
		_options: {type: Object, required: true, doc: true},
		values: {type: Array, required: false, doc: true},
		_values: {type: String, required: true},
		list: {type: Array, required: true, doc: true}
	},
	data() {
		return {
			data: {
				values: []
			}
		}
	},
	computed: {
		nodata: (t) => t.data.values.length === 0,
		oLabel: (t) => t._options.label,
		oValue: (t) => t._options.value,

		listMap: (t) => t.list.map(x => ({
			label: x[t.oLabel],
			value: x[t.oValue]
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
	},
	created() {
		this.data.values = this.listMap.map(x => x.value);
	}
}
</script>

<style lang="scss" scoped>
.select-multi {
	.el-select {
		width: 100%;
	}
}
</style>
