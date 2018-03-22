<template>
	<div class="reorder">
		<table class="items">
			<thead>
				<tr><th v-for="column in _columns">{{column.label}}</th></tr>
			</thead>

			<draggable v-model="items" @end="update" element="tbody">
				<tr v-for="item in items">
					<td v-for="column in _columns">{{item[column.key]}}</td>
				</tr>
			</draggable>
		</table>
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
	border: 1px solid $blue2;
	border-radius: 4px;

	.items {
		width: 100%;
		border-collapse: collapse;
		font-size: em(14);

		tr {
			&:nth-child(even) {
				td {
					background-color: $white2;
				}
			}
			th, td {
				text-align: left;
				padding: 0.8em;
			}

			th {
				font-weight: 500;
				border-bottom: 1px solid $blue2;
			}

			td {
				cursor: grab;
			}
		}
	}
}
</style>
