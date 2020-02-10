<template>
	<div class="reorder">
		<div class="move" v-if="isSelected">
			<ButtonGroup>
				<Button
					@click="moveSelected('top')"
					icon="el-icon-arrow-up"
					size="mini"
				>
					Top
				</Button>
				<Button
					@click="moveSelected('bottom')"
					icon="el-icon-arrow-down"
					size="mini"
				>
					Bottom
				</Button>
			</ButtonGroup>
		</div>

		<div class="table" v-if="loaded">
			<table>
				<thead>
					<tr>
						<th />
						<th />
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
						<td class="select">
							<input type="checkbox" v-model="selected[item.id]" />
						</td>
						<td class="top" @click="moveTop([item])" title="Move to top">
							<i class="el-icon-d-arrow-left" />
						</td>
						<td
							class="bottom"
							@click="moveBottom([item])"
							title="Move to Bottom"
						>
							<i class="el-icon-d-arrow-left" />
						</td>
						<td
							v-for="column in _columns"
							:key="column.key"
							class="drag"
							v-text="get(item, column.key)"
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
import {ButtonGroup, Button} from "element-ui";
import draggable from "vuedraggable";
import {get} from "lodash";

export default {
	components: {draggable, ButtonGroup, Button},
	meta: {
		res: {
			props: {
				prop: "propKey",
				options: {
					key: "",
					value: "id",
					endpoint: {
						url: "items",
						params: {test: "test"}
					}
				},
				columns: [
					{
						key: "id",
						label: "Id"
					},
					{
						key: "nested.name",
						label: "Name"
					}
				]
			},
			data: {}
		}
	},
	props: {
		_prop: {type: String, required: true, doc: true},
		_columns: {type: Array, required: true, doc: true},
		_options: {type: Object, required: true, doc: true}
	},
	data() {
		return {
			loaded: false,
			selected: {},
			items: []
		};
	},
	computed: {
		isSelected: (t) => Object.values(t.selected).some((x) => x)
	},
	methods: {
		get,

		moveSelected(dir) {
			const items = this.items.filter((x) => this.selected[x.id]);
			if (dir === "bottom") this.moveBottom(items);
			if (dir === "top") this.moveTop(items);
			this.selected = {};
		},

		moveTop(items) {
			let defItems = this.items.filter((item) => !items.includes(item));
			defItems = [...items, ...defItems];
			this.items = defItems;
			this.update();
		},

		moveBottom(items) {
			let defItems = this.items.filter((item) => !items.includes(item));
			defItems = [...defItems, ...items];
			this.items = defItems;
			this.update();
		},

		update() {
			const ids = this.items.map((x) => x[this._options.value]);

			this.$emit("event", {
				actions: {
					update: {data: {[this._prop]: ids}}
				}
			});
		},

		async getItems() {
			const {
				endpoint: {url, params}
			} = this._options;
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
	position: relative;

	.move {
		position: absolute;
		right: 0;
		top: -2.5em;
	}

	.table {
		border: 1px solid $blue2;
		border-radius: 4px;
		max-height: calc(100vh - 35em);
		overflow: auto;

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

					&.select {
						width: 1.25em;
					}

					&.top {
						width: 1.25em;
						cursor: pointer;

						i {
							transform: rotate(90deg);
						}
					}

					&.bottom {
						width: 1.25em;
						cursor: pointer;

						i {
							transform: rotate(-90deg);
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
