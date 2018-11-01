<template>
	<div class="select-multi-search-add">
		<Select
		v-model="data.values"
		v-bind="{size, loading}"
		:remote-method="getListOptionsQ"
		:disabled="_disabled"
		:clearable="_clearable"
		@change="update"
		@visible-change="initSearch"
		filterable multiple remote reserve-keyword>
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
				disabled: false,
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
		_disabled: {type: Boolean, required: false, doc: true},
		meta: {type: Object, require: false, default: () => ({})},
		_clearable: {type: Boolean, required: false, default: true, doc: true},
		_options: {type: Object, required: true, doc: true},
		_values: {type: String, required: true},
		values: {type: Array, required: false, default: () => [], doc: true, note: `
			Can be an array of <i>objects|strings|numbers</i>.<br>
			if it's strings|numbers, an initial call to <code>options.list</code> will be made to get the label names for the values.
		`}
	},
	data() {
		return {
			opened: false,
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
		nodata: (t) => t.data.values.length === 0,
		endpoint: (t) => t._options.list,
		oLabel: (t) => t._options.label,
		oValue: (t) => t._options.value,
		oKey: (t) => t._options.key,

		list() {
			let list = [...this.listSelected, ...this.listOptions];
			list = uniqBy(list, this.oValue);

			return list.map(x => ({
				value: get(x, this.oValue).toString(),
				label: get(x, this.oLabel)
			}));
		},

		size() {
			if (this.meta.location === "table") return "small";
			if (this.meta.location === "tabs") return "medium";
			return "medium";
		}
	},
	methods: {
		initSearch(open) {
			if (!this.opened && open) {
				this.opened = true;
				this.getListOptions();
			}
		},

		update(val) {
			this.$emit("fieldA", {
				action: "update",
				data: {[this._values]: val}
			});
		},

		async getListOptions(search) {
			const {data} = await this.$axios.get(this.endpoint, {params: {filter: {search}, count: 30}});
			this.listOptions = get(data, this.oKey, []);
			this.loading = false;
		},

		getListOptionsDebounced: debounce(function(search) {
			this.getListOptions(search);
		}, 500),

		getListOptionsQ(search) {
			this.loading = true;
			this.getListOptionsDebounced(search);
		},

		async getListSelected() {
			const {data} = await this.$axios.get(this.endpoint, {params: {filter: {[this.oValue]: this.values}}});
			return get(data, this.oKey, []);
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
