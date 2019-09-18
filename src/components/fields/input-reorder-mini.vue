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
					<tr v-for="item in items" :key="item.id">
						<td class="top" @click="moveTop(item)" title="Move to top">
							<i class="el-icon-d-arrow-left" />
						</td>
						<td
							v-for="column in _columns"
							:key="column.key"
							class="drag"
							v-text="item[column.key]"
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
		res: {
			props: {
				value: "key",
				_options: {
					key: "",
					value: "id",
					endpoint: {
						url: "items",
						params: {test: "test"}
					}
				},
				_columns: [
					{
						key: "id",
						label: "Id"
					},
					{
						key: "name",
						label: "Name"
					}
				]
			}
		}
	},
	props: {
		_options: {type: Object, required: true},
		_columns: {type: Array, required: true},
		value: {required: false}
	},
	data() {
		return {
			loaded: false,
			items: []
		};
	},
	methods: {
		moveTop(item) {
			const items = this.items.filter((x) => x !== item);
			items.unshift(item);
			this.items = items;
			this.update();
		},

		update() {
			const ids = this.items.map((x) => x[this._options.value]);

			this.$emit("event", {
				actions: {
					update: {data: {value: ids}}
				}
			});
		},

		async getItems() {
			const {url, params} = this._options.endpoint;
			const {data} = await this.$axios.get(url, {params});
			this.items = get(data, this._options.key, data);
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
