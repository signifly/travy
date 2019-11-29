<template>
	<div class="select-search">
		<Select
			:value="value"
			:remote-method="elementGet"
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
import {merge, get} from "lodash";

export default {
	components: {Select, Option},
	meta: {
		spec: {
			value: {type: [String, Number], required: false},
			_disabled: {type: Boolean, required: false},
			_clearable: {type: Boolean, default: true},
			_addable: {type: Boolean, required: false},
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
				value: 1
			}
		}
	},
	props: {
		value: {type: [String, Number], required: false},
		_disabled: {type: Boolean, required: false},
		_clearable: {type: Boolean, default: true},
		_addable: {type: Boolean, required: false},
		_entities: {type: Object, required: true}
	},
	data() {
		return {
			opened: false,
			items: []
		};
	},
	computed: {
		selectedItem: (t) => t.itemsC.find((x) => x.value === t.value),

		itemsC() {
			return this.items.map((x) => ({
				value: get(x, this._entities.value),
				label: get(x, this._entities.label)
			}));
		}
	},
	methods: {
		open(open) {
			if (!this.opened && open) {
				this.opened = true;
				this.getItems();
			}
		},

		elementGet(search) {
			this.getItems({search});
		},

		async getItems({search, filter} = {}) {
			const {url, params} = this._entities.endpoint;
			const {dataWrap} = this._entities;

			const {data} = await this.$axios.get(url, {
				params: merge({}, params, {
					filter: {
						search,
						...filter
					}
				})
			});

			this.items = get(data, dataWrap, data);
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
					this.getItems({filter: {[this._entities.value]: [value]}});
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
