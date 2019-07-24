<template>
	<div class="select-multi-search-table">
		<div class="select">
			<selectMultiSearch
				ref="select"
				v-bind="{_clearable, _options, _values, values, disabled: _disabled}"
				@event="selectEvent"
			/>
		</div>
		<vTable
			:key="columnsData.length"
			v-bind="{_columns, columnsData}"
			@event="$emit('event', $event)"
			@data="update"
		/>
	</div>
</template>

<script>
import selectMultiSearch from "./input-select-multi-search.vue";
import vTable from "./table.vue";
import {get} from "lodash";

export default {
	components: {selectMultiSearch, vTable},
	meta: {
		res: {
			props: {
				disabled: false,
				values: "values",
				options: {
					endpoint: {
						url: "items",
						params: {filter: {test: "test"}}
					},
					key: "",
					label: "name",
					value: "id"
				},

				columns: [
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
					}
				],

				columnsDataOverwrite: {
					is_mandatory: true
				}
			},
			data: {
				values: [
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
		_disabled: {type: Boolean, required: false, doc: true},
		meta: {type: Object, require: false, default: () => ({})},

		// vSelectMultiSearch props
		_clearable: {type: Boolean, required: false, default: true, doc: true},
		_options: {type: Object, required: true, doc: true},
		_values: {type: String, required: true},
		values: {
			type: Array,
			required: false,
			default: () => [],
			doc: true,
			note: `
				Array of <i>objects</i>.
			`
		},

		// vTable props
		_columns: {type: Array, required: true, doc: true},
		_columnsDataOverwrite: {type: Object, required: true, doc: true}
	},
	data() {
		return {
			edits: {}
		};
	},
	computed: {
		columnsData: (t) => t.values,
		oValue: (t) => t._options.value
	},
	methods: {
		selectEvent({actions}) {
			if (actions.update) {
				const {data} = actions.update;
				const values = get(data, this._values);

				const columnsData = values.map((item) => {
					const oldItem = this.columnsData.find(
						(x) => x[this.oValue] === item[this.oValue]
					);

					return {
						...item,
						...oldItem, // keep old state of item
						...this._columnsDataOverwrite // overwrite properties if exists in _columnsDataOverwrite
					};
				});

				this.update(columnsData);
			}
		},

		update(data) {
			this.$emit("event", {
				actions: {
					update: {data: {[this._values]: data}}
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
