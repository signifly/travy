<template>
	<div class="select-multi-search">
		<Select
			@visible-change="initSearch"
			:remote-method="getItems"
			:allow-create="addable"
			:reserve-keyword="true"
			:value="selectedItems"
			:clearable="clearable"
			:disabled="disabled"
			:filterable="true"
			@change="update"
			:multiple="true"
			:remote="true"
		>
			<Option v-for="item in Items" v-bind="item" :key="item.value" />
		</Select>
	</div>
</template>

<script>
import {get, merge, uniqBy} from "lodash";
import {Select, Option} from "element-ui";

export default {
	components: {Select, Option},
	meta: {
		spec: {
			disabled: {type: Boolean, required: false},
			clearable: {type: Boolean, default: true},
			addable: {type: Boolean, required: false},
			value: {type: Array, required: true},
			entities: {
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
				value: "{value}",
				addable: true,
				entities: {
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
		disabled: {type: Boolean, required: false},
		clearable: {type: Boolean, default: true},
		addable: {type: Boolean, required: false},
		entities: {type: Object, required: true},
		value: {type: Array, default: () => []}
	},
	data() {
		return {
			opened: false,
			items: []
		};
	},
	computed: {
		selectedItems: (t) => t.value.map((x) => get(x, t.entities.value)),
		allItems: (t) => uniqBy([...t.items, ...t.value], t.entities.value),

		Items: (t) =>
			t.allItems.map((x) => ({
				value: get(x, t.entities.value),
				label: get(x, t.entities.label)
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
			const {url, params} = this.entities.endpoint;
			const {dataWrap} = this.entities;

			const {data} = await this.$axios.get(url, {
				params: merge({}, params, {
					filter: {search}
				})
			});

			this.items = get(data, dataWrap, data);
		},

		update(data) {
			const ent = this.entities;

			const value = data.map((val) => {
				// [1, 2] => [{}, {}]
				const item = this.allItems.find((x) => x[ent.value] === val);

				// if new item
				return (
					item || {
						[ent.value]: val,
						[ent.label]: val,
						new: true
					}
				);
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
