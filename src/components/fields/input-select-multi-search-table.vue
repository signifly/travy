<template>
	<div class="select-multi-search-table">
		<div class="select">
			<selectMultiSearch
				ref="select"
				v-bind="select"
				:values="data"
				@event="selectEvent"
			/>
		</div>
		<vTable
			:key="data.length"
			:_columns="table._columns"
			:data="data"
			@event="tableEvent"
		/>
	</div>
</template>

<script>
import selectMultiSearch from "./input-select-multi-search.vue";
import vTable from "./table.vue";
import produce from "immer";

export default {
	components: {selectMultiSearch, vTable},
	meta: {
		res: {
			props: {
				data: "data",

				select: {
					_clearable: false,
					_disabled: false,
					_options: {
						endpoint: {
							url: "items",
							params: {filter: {test: "test"}}
						},
						key: "",
						label: "name",
						value: "id"
					}
				},

				table: {
					_columns: [
						{
							name: "title",
							label: "Title",
							fieldType: {
								id: "text",
								props: {
									text: "name"
								}
							}
						},
						{
							name: "switch",
							label: "Switch",
							fieldType: {
								id: "input-switch",
								props: {
									value: "bool"
								}
							}
						},
						{
							name: "text",
							label: "text",
							fieldType: {
								id: "input-text",
								props: {
									value: "text"
								}
							}
						}
					],

					_columnsDataOverwrite: {
						is_mandatory: true
					}
				}
			},
			data: {
				data: [
					{
						id: 1,
						name: "item1",
						bool: false,
						image: "https://picsum.photos/600/600",
						is_mandatory: true
					}
				]
			}
		}
	},
	props: {
		select: {type: Object, required: true},
		data: {type: Array, default: () => []},
		table: {type: Object, required: true}
	},
	data() {
		return {
			edits: {}
		};
	},
	methods: {
		selectEvent(event) {
			const update = event.actions.update;

			if (update) {
				const values = update.data.values;

				const data = values.map((value) => {
					// find data item by all properties of value
					const item = this.data.find((item) => {
						return Object.entries(value).every(([k, v]) => item[k] === v);
					});

					return {
						...value,
						...item,
						...this._columnsDataOverwrite
					};
				});

				this.update(data);
			}
		},

		tableEvent(event) {
			const update = event.actions.update;

			if (update) {
				const data = produce(this.data, (data) => {
					const index = data.findIndex((x) => x.id === update.item.id);
					data[index] = {...update.item, ...update.data};
				});

				this.update(data);
			}
		},

		update(data) {
			this.$emit("event", {
				actions: {
					update: {data: {data}}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.select-multi-search-table {
	.select {
		margin-bottom: 1em;
	}
}
</style>
