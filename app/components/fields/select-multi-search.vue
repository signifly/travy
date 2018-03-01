<template>
	<div class="select-multi-search-add">
		<Select v-model="data.values" @change="update" v-bind="{size, loading}" :remote-method="getListQ" filterable multiple remote reserve-keyword>
			<Option v-for="item in list" v-bind="item" :key="item.value" />
		</Select>
	</div>
</template>

<script>
import {get, debounce, uniqBy, isObjectLike} from "lodash";
import {Select, Option} from "element-ui";

export default {
	components: {Select, Option},
	meta: {
		res: {
			props: {
				values: "values",
				options: {
					list: "https://sikaline.glitch.me/table-actions/options",
					key: "",
					label: "name",
					value: "id"
				}
			},
			data: {
				values: ["1", "2"],
				values_strings: ["1", "2"],
				values_numbers: [1 ,2],

				valuesss: [
					{
						id: "1",
						name: "stol"
					},
					{
						id: "2",
						name: "taske"
					}
				]
			}
		}
	},
	props: {
		meta: {type: Object, require: false, default: () => ({})},
		_options: {type: Object, required: true, doc: true},
		_values: {type: String, required: true},
		values: {type: Array, required: false, doc: true, note: `
			Can be an array of <i>objects|strings|numbers</i>.<br>
			if it's strings|numbers, an initial call to <code>options.list</code> will be made to get the label names for the values.
		`}
	},
	data() {
		return {
			loading: false,
			listOptions: [],
			listSelected: [],
			res: null,
			data: {
				values: []
			}
		}
	},
	computed: {
		valuesObj: (t) => t.values.map(x => isObjectLike(x)).every(x => x),
		endpoint: (t) => t._options.list,
		oKey: (t) => t._options.key,
		oLabel: (t) => t._options.label,
		oValue: (t) => t._options.value,

		list() {
			let list = [...this.listSelected, ...this.listOptions];
			list = uniqBy(list, this.oValue);

			return list.map(x => ({
				label: x[this.oLabel],
				value: x[this.oValue]
			}));
		},

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
		},

		getListOptions: debounce(async function(q) {
			const {data} = await this.$http.get(this.endpoint, {params: {q, count: 30}});
			this.listOptions = get(data.data, this.oKey, data) || [];
			this.loading = false;
		}, 500),

		getListQ(q) {
			this.getListOptions(q);
			this.loading = true;
		},

		async getListSelected() {
			const {data} = await this.$http.get(this.endpoint, {params: {filter: this.values}});
			return get(data.data, this.oKey, data) || [];
		},

		async init() {
			if (this.valuesObj) {
				this.listSelected = this.values;
				this.data.values = this.values.map(x => x[this.oValue]);
			} else {
				this.listSelected = await this.getListSelected();
				this.data.values = this.values;
			}
		}
	},
	created() {
		this.init();
	}
};
</script>

<style lang="scss" scoped>
.select-multi-search-add {
	.el-select {
		width: 100%;
	}
}
</style>
