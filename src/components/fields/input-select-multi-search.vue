<template>
	<div class="select-multi-search">
		<Select
			v-bind="{size}"
			:value="selectedItems"
			:disabled="_disabled"
			:clearable="_clearable"
			:allow-create="_addable"
			:filterable="true"
			:multiple="true"
			:remote="true"
			:reserve-keyword="true"
			:remote-method="getItems"
			@change="update"
			@visible-change="initSearch"
		>
			<Option v-for="item in optionItemsC" v-bind="item" :key="item.value" />
		</Select>
	</div>
</template>

<script>
import {get, merge, uniqBy, pick} from "lodash";
import {Select, Option} from "element-ui";

export default {
	components: {Select, Option},
	meta: {
		res: {
			props: {
				disabled: false,
				values: "values",
				options: {
					endpoint: {
						url: "items",
						params: {filter: {test: "test"}}
					},
					key: "",
					label: "name",
					value: "id"
				}
			},
			data: {
				values: [
					{
						id: 1,
						name: "item1"
					},
					{
						id: 2,
						name: "item2"
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
		values: {default: () => [], doc: true},
		_values: {type: String, required: true}
	},
	data() {
		return {
			opened: false,
			optionItems: []
		};
	},
	computed: {
		endpoint: (t) => t._options.endpoint,

		size() {
			if (this.meta.location === "table") return "small";
			if (this.meta.location === "tabs") return "medium";
			return "medium";
		},

		allItems: (t) => uniqBy([...t.optionItems, ...t.values], t._options.value),
		selectedItems: (t) => t.values.map((x) => get(x, t._options.value)),

		optionItemsC: (t) =>
			t.allItems.map((x) => ({
				value: get(x, t._options.value),
				label: get(x, t._options.label)
			}))
	},
	methods: {
		initSearch() {
			if (!this.opened) {
				this.opened = true;
				this.getItems();
			}
		},

		async getItems(search) {
			const key = this._options.key;

			const {data} = await this.$axios.get(this.endpoint.url, {
				params: merge({}, this.endpoint.params, {
					filter: {search}
				})
			});

			this.optionItems = key ? get(data, key) : data;
		},

		update(data) {
			const values = data.map((val) => {
				// [1, 2] => [{}, {}]
				let item = this.allItems.find((x) => x[this._options.value] === val);

				// if new item
				item = item || {
					[this._options.value]: val,
					[this._options.label]: val,
					new: true
				};

				// only emit label and value properties
				return pick(item, [this._options.value, this._options.label, "new"]);
			});

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
.select-multi-search {
	.el-select {
		width: 100%;
	}
}
</style>
