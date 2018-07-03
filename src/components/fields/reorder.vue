<template>
	<div class="reorder">
		<div class="table" v-if="items.length > 0">
			<table>
				<thead>
					<tr>
						<th />
						<th v-for="column in _columns">{{column.label}}</th>
					</tr>
				</thead>

				<draggable v-model="items" :options="{handle: '.drag'}" @end="update" element="tbody">
					<tr v-for="item in items">
						<td class="top" @click="moveTop(item)" title="Move to top"><i class="el-icon-d-arrow-left" /></td>
						<td v-for="column in _columns" class="drag">{{item[column.key]}}</td>
					</tr>
				</draggable>
			</table>
		</div>

		<div class="loading" v-else>
			<i class="el-icon-loading"></i>
		</div>
	</div>
</template>

<script>
import {get} from "lodash";
import draggable from "vuedraggable";

export default {
	components: {draggable},
	meta: {
		res: {
			props: {
				items: "items",
				itemsKey: "data",
				itemsValue: "id",
				endpoint: {
					method: "get",
					url: "products"
				},
				columns: [
					{
						key: "id",
						label: "Id"
					},
					{
						key: "title",
						label: "Name"
					}
				]
			},
			data: {

			}
		}
	},
	props: {
		_items: {type: String, required: true},
		_itemsKey: {type: String, required: false, doc: true},
		_itemsValue: {type: String, required: true, doc: true},
		_columns: {type: Array, required: true, doc: true},
		_endpoint: {type: Object, required: true, doc: true}
	},
	data() {
		return {
			items: []
		}
	},
	methods: {
		moveTop(item) {
			const items = this.items.filter(x => x !== item);
			items.unshift(item);
			this.items = items;
			this.update();
		},

		update() {
			const ids = this.items.map(x => x[this._itemsValue]);

			this.$emit("fieldA", {
				action: "update",
				data: {[this._items]: ids}
			});
		},

		async getItems() {
			const ept = this._endpoint;

			const {data} = await this.$http({
				method: ept.method,
				url: ept.url
			});

			this.items = get(data, this._itemsKey, data);
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
				&:nth-child(even) {
					td {
						background-color: $white2;
					}
				}

				th, td {
					text-align: left;
					padding: 0.25em 0.5em;
				}

				th {
					font-weight: 500;
					border-bottom: 1px solid $blue2;
				}

				td {
					background-color: $white1;

					&.drag {
						cursor: grab;
					}

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
	}

	.loading {
		font-size: 1.5em;
		text-align: center;
		margin: 1em 0;
	}
}
</style>
