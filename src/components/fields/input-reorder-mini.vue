<template>
	<div class="reorder">
		<div class="table" v-if="loaded">
			<table>
				<thead>
					<tr>
						<th />
						<th
							v-for="column in _columns"
							:key="column.label"
							v-text="column.label"
						/>
					</tr>
				</thead>

				<draggable v-model="items" handle=".drag" @end="update" tag="tbody">
					<tr v-for="item in itemsC" :key="item.id">
						<td class="top" @click="moveTop(item)" title="Move to top">
							<i class="el-icon-d-arrow-left" />
						</td>
						<td
							v-for="column in item.columns"
							:key="`${item.id}-${column}`"
							class="drag"
							v-text="column"
						/>
					</tr>
				</draggable>
			</table>

			<div class="noitems" v-if="!items.length">0 items</div>
		</div>

		<div class="loading" v-else>
			<i class="el-icon-loading" />
		</div>
	</div>
</template>

<script>
import draggable from "vuedraggable";
import {get} from "lodash";

export default {
	components: {draggable},
	meta: {
		spec: {
			value: {required: false},
			_entities: {
				type: Object,
				required: true,
				children: {
					dataWrap: {type: String, required: false},
					value: {type: String, required: true},
					endpoint: {
						type: Object,
						required: true,
						children: {
							url: {type: String, required: true},
							params: {type: Object, required: false}
						}
					}
				}
			},
			_columns: {
				type: Array,
				required: true,
				children: {
					value: {type: String, required: true, note: "maps to an entity"},
					label: {type: String, required: true}
				}
			}
		},
		res: {
			props: {
				value: "itemId",
				_entities: {
					value: "id",
					endpoint: {
						url: "items",
						params: {test: "test"}
					}
				},
				_columns: [
					{
						value: "id",
						label: "Id"
					},
					{
						value: "nested.name",
						label: "Name"
					}
				]
			}
		}
	},
	props: {
		_entities: {type: Object, required: true},
		_columns: {type: Array, required: true},
		value: {required: false}
	},
	data() {
		return {
			loaded: false,
			items: []
		};
	},
	computed: {
		itemsC() {
			return this.items.map((item) => ({
				item,
				id: item.id,
				columns: this._columns.map((column) => get(item, column.value))
			}));
		}
	},
	methods: {
		moveTop({item}) {
			const items = this.items.filter((x) => x !== item);
			items.unshift(item);
			this.items = items;
			this.update();
		},

		update() {
			const value = this.items.map((x) => get(x, this._entities.value));

			this.$emit("event", {
				actions: {
					update: {data: {value}}
				}
			});
		},

		async getItems() {
			const {url, params} = this._entities.endpoint;
			const {dataWrap} = this._entities;

			const {data} = await this.$axios.get(url, {params});
			this.items = get(data, dataWrap, data);
			this.loaded = true;
		}
	},
	created() {
		this.getItems();
	}
};
</script>

<style lang="scss" scoped>
.reorder {
	.table {
		border: 1px solid $blue2;
		border-radius: 4px;

		table {
			width: 100%;
			border-collapse: collapse;
			font-size: em(12);

			tr {
				&.sortable-ghost {
					color: $blue5;
				}

				&:nth-child(even) {
					td {
						background-color: $white2;
					}
				}

				th,
				td {
					text-align: left;
					padding: 0.25em 0.5em;
				}

				th {
					font-weight: 500;
					border-bottom: 1px solid $blue2;
				}

				td {
					background-color: $white1;

					&.top {
						width: 1.5em;
						cursor: pointer;

						i {
							transform: rotate(90deg);
						}
					}
				}
			}
		}

		.noitems {
			text-align: center;
			font-weight: 500;
			font-size: 12px;
			margin: 1em;
		}
	}

	.loading {
		font-size: 1.5em;
		text-align: center;
		margin: 1em 0;
	}
}
</style>
