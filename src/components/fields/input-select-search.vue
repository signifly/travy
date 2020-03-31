<template>
	<div class="select-search">
		<Select
			v-bind="{value, disabled, clearable}"
			:remote-method="elementGet"
			:allow-create="addable"
			@visible-change="open"
			:filterable="true"
			@change="update"
			:remote="true"
		>
			<Option v-for="item in Items" :key="item.value" v-bind="item" />
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
			disabled: {type: Boolean, required: false},
			clearable: {type: Boolean, default: true},
			addable: {type: Boolean, required: false},
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
				value: 1
			}
		}
	},
	props: {
		value: {type: [String, Number], required: false},
		disabled: {type: Boolean, required: false},
		clearable: {type: Boolean, default: true},
		addable: {type: Boolean, required: false},
		entities: {type: Object, required: true}
	},
	data() {
		return {
			opened: false,
			items: []
		};
	},
	computed: {
		selectedItem: (t) => t.Items.find((x) => x.value === t.value),

		Items() {
			return this.items.map((x) => ({
				value: get(x, this.entities.value),
				label: get(x, this.entities.label)
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
			const {url, params} = this.entities.endpoint;
			const {dataWrap} = this.entities;

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
	created() {
		if (this.value) {
			this.getItems({filter: {[this.entities.value]: [this.value]}});
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
