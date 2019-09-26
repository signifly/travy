<template>
	<div class="select-search">
		<Select
			:value="value"
			:remote-method="getItems"
			:disabled="_disabled"
			:clearable="_clearable"
			:allow-create="_addable"
			:filterable="true"
			:remote="true"
			@change="update"
			@visible-change="open"
		>
			<Option v-for="item in itemsC" :key="item.value" v-bind="item" />
		</Select>
	</div>
</template>

<script>
import {Select, Option} from "element-ui";
import {merge, get, uniqBy} from "lodash";

export default {
	components: {Select, Option},
	meta: {
		spec: "props",
		res: {
			props: {
				_clearable: false,
				_disabled: false,
				_addable: false,
				value: "selectValue",
				_options: {
					endpoint: {
						url: "items",
						params: {filter: {test: "test"}}
					},
					itemKey: "",
					key: "",
					label: "name",
					value: "id"
				}
			},
			data: {
				selectValue: 1
			}
		}
	},
	props: {
		_disabled: {type: Boolean, required: false},
		_clearable: {type: Boolean, required: false, default: true},
		_addable: {type: Boolean, required: false},
		value: {type: [String, Number], required: false},
		_options: {type: Object, required: true}
	},
	data() {
		return {
			selectedItem: null,
			opened: false,
			items: []
		};
	},
	computed: {
		endpoint: (t) => t._options.endpoint,

		itemsC() {
			const items = [this.selectedItem, ...this.items]
				.filter((x) => x)
				.map((x) => ({
					value: get(x, this._options.value),
					label: get(x, this._options.label)
				}));

			return uniqBy(items, "value");
		}
	},
	methods: {
		open() {
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

			this.items = key ? get(data, key) : data;
		},

		async getSelectedItem() {
			const key = this._options.itemKey;

			const {data} = await this.$axios.get(
				`${this.endpoint.url}/${this.value}`
			);

			this.selectedItem = key ? get(data, key) : data;
		},

		update(value) {
			this.$emit("event", {
				actions: {
					update: {data: {value}}
				}
			});
		}
	},
	watch: {
		value: {
			immediate: true,
			handler(value) {
				if (value && !this.selectedItem) {
					this.getSelectedItem();
				}
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.select-search {
	.el-select {
		width: 100%;
	}
}
</style>
