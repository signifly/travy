<template>
	<div class="select-multi-add">
		<Select v-model="data.value" @change="update" v-bind="{size}" filterable multiple allow-create>
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
				value: "selectValue",
				list: "selectOptions",
				options: {
					label: "name",
					value: "id"
				}
			},
			data: {
				selectValue: ["DK"],
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
		meta: {type: Object, require: false, default: () => ({})},
		_options: {type: Object, required: true, doc: true},
		value: {type: Array, required: false, doc: true},
		_value: {type: String, required: true},
		list: {type: Array, required: true, doc: true}
	},
	data() {
		return {
			data: {
				value: []
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
				data: {[this._value]: val}
			});
		}
	},
	created() {
		this.data.value = this.listMap.map(x => x.value);
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
