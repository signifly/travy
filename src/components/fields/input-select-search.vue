<template>
	<div class="select-search">
		<Select
			v-bind="{value, size}"
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
		res: {
			props: {
				disabled: false,
				addable: false,
				value: "selectValue",
				options: {
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
		_disabled: {type: Boolean, required: false, doc: true},
		meta: {type: Object, require: false, default: () => ({})},
		_clearable: {type: Boolean, required: false, default: true, doc: true},
		_addable: {type: Boolean, required: false, doc: true},
		value: {type: [String, Number], required: false, doc: true},
		_value: {type: String, required: true},
		options: {type: Object, required: false},
		_options: {type: Object, required: true, doc: true}
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

		size() {
			if (this.meta.location === "table") return "small";
			if (this.meta.location === "tabs") return "medium";
			return "medium";
		},

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
					update: {data: {[this._value]: value}}
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
