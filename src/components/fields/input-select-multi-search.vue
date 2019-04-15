<template>
	<div class="select-multi-search">
		<Select
			v-bind="{size}"
			:value="valuesC"
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
			<Option v-for="item in itemsC" v-bind="item" :key="item.value" />
		</Select>
	</div>
</template>

<script>
import {get, merge, isObjectLike} from "lodash";
import {Select, Option} from "element-ui";
import {meta} from "@/modules/utils";

export default {
	components: {Select, Option},
	meta: {
		res: {
			props: {
				disabled: false,
				values: "values",
				options: {
					endpoint: {
						url: meta.items,
						params: {filter: {test: "test"}}
					},
					key: "",
					label: "name",
					value: "id"
				}
			},
			data: {
				values: [1, 2, 3],

				valuesObjs: [
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
		_values: {type: String, required: true},
		values: {
			required: true,
			default: () => [],
			doc: true,
			note: `
			Can be an array of <i>objects|strings|numbers</i>.<br>
			if it's strings|numbers, an initial call to <code>options.list</code> will be made to get the label names for the values.
		`
		}
	},
	data() {
		return {
			selectedItems: this.values,
			opened: false,
			items: []
		};
	},
	computed: {
		objArray: (t) => t.values.map((x) => isObjectLike(x)).every((x) => x),
		endpoint: (t) => t._options.endpoint,

		size() {
			if (this.meta.location === "table") return "small";
			if (this.meta.location === "tabs") return "medium";
			return "medium";
		},

		valuesC: (t) =>
			!t.objArray
				? t.values
				: t.values.map((x) => {
						return get(x, t._options.value);
				  }),

		itemsC: (t) =>
			[...t.selectedItems, ...t.items].map((x) => ({
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
					filter: {search},
					count: 30
				})
			});

			this.items = key ? get(data, key) : data;
		},

		async getSelectedItems() {
			const key = this._options.key;
			const val = this._options.value;

			if (!this.objArray) {
				const {data} = await this.$axios.get(this.endpoint.url, {
					params: {
						filter: {[val]: this.values}
					}
				});
				this.selectedItems = key ? get(data, key) : data;
			}

			// remove selectedItem after Select caches it
			this.$nextTick(() => (this.selectedItems = []));
		},

		update(values) {
			this.$emit("event", {
				actions: {
					update: {data: {[this._values]: values}}
				}
			});
		}
	},
	created() {
		this.getSelectedItems();
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
