<template>
	<div class="reorder">
		<div class="table" v-if="items.length > 0">
			<table>
				<thead>
					<tr>
						<th/>
						<th v-for="column in _columns" :key="column.label" v-text="column.label"/>
					</tr>
				</thead>

				<draggable v-model="items" handle=".drag" @end="update" tag="tbody">
					<tr v-for="item in items" :key="item.id">
						<td class="top" @click="moveTop(item)" title="Move to top"><i class="el-icon-d-arrow-left"/>
						<td v-for="column in _columns" :key="column.key" class="drag" v-text="item[column.key]"/>
					</tr>
				</draggable>
			</table>
		</div>

		<div class="loading" v-else>
			<i class="el-icon-loading"/>
		</div>
	</div>
</template>

<script>
import {get} from "lodash";
import {meta} from "@/modules/utils";
import draggable from "vuedraggable";

export default {
	components: {draggable},
	meta: {
		res: {
			props: {
				prop: "propKey",
				options: {
					key: "",
					value: "id",
					endpoint: {
						url: meta.items,
						params: {test: "test"}
					}
				},
				columns: [
					{
						key: "id",
						label: "Id"
					},
					{
						key: "name",
						label: "Name"
					}
				]
			},
			data: {

			}
		}
	},
	props: {
		_prop: {type: String, required: true, doc: true},
		_columns: {type: Array, required: true, doc: true},
		_options: {type: Object, required: true, doc: true}
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
			const ids = this.items.map(x => x[this._options.value]);

			this.$emit("event", {
				actions: {
					update: {data: {[this._prop]: ids}}
				}
			});
		},

		async getItems() {
			const {endpoint: {url, params}} = this._options;
			const {data} = await this.$axios.get(url, {params});
			this.items = get(data, this._options.key, data);
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
