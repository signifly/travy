<template>
	<div class="select-multi-search">
		<Select
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
			<Option v-for="item in itemsC" v-bind="item" :key="item.value" />
		</Select>
	</div>
</template>

<script>
import {get, merge, uniqBy, pick} from "lodash";
import {Select, Option} from "element-ui";

export default {
	components: {Select, Option},
	meta: {
		spec: {
			_disabled: {type: Boolean, required: false},
			_clearable: {type: Boolean, default: true},
			_addable: {type: Boolean, required: false},
			value: {type: Array, required: true},
			_entities: {
				type: Object,
				required: true,
				children: {
					dataWrap: {type: String, required: false},
					label: {type: String, required: true, note: "maps to an entity"},
					value: {
						type: [String, Number],
						required: true,
						note: "maps to an entity"
					},
					endpoint: {
						type: Object,
						required: true,
						children: {
							url: {type: String, required: true},
							params: {type: Object, required: false}
						}
					}
				}
			}
		},
		res: {
			props: {
				value: "value",
				_entities: {
					endpoint: {
						url: "items",
						params: {filter: {test: "test"}}
					},
					label: "name",
					value: "id"
				}
			},
			data: {
				value: [
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
		_disabled: {type: Boolean, required: false},
		_clearable: {type: Boolean, default: true},
		_addable: {type: Boolean, required: false},
		_entities: {type: Object, required: true},
		value: {type: Array, required: true}
	},
	data() {
		return {
			opened: false,
			items: []
		};
	},
	computed: {
		selectedItems: (t) => t.value.map((x) => get(x, t._entities.value)),
		allItems: (t) => uniqBy([...t.items, ...t.value], t._entities.value),

		itemsC: (t) =>
			t.allItems.map((x) => ({
				value: get(x, t._entities.value),
				label: get(x, t._entities.label)
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
			const {url, params} = this._entities.endpoint;
			const {dataWrap} = this._entities;

			const {data} = await this.$axios.get(url, {
				params: merge({}, params, {
					filter: {search}
				})
			});

			this.items = get(data, dataWrap, data);
		},

		update(data) {
			const ent = this._entities;

			const value = data.map((val) => {
				// [1, 2] => [{}, {}]
				let item = this.allItems.find((x) => x[ent.value] === val);

				// if new item
				item = item || {
					[ent.value]: val,
					[ent.label]: val,
					new: true
				};

				// only emit label and value properties
				return pick(item, [ent.value, ent.label, "new"]);
			});

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
.select-multi-search {
	.el-select {
		width: 100%;
	}
}
</style>
