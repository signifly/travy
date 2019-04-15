<template>
	<div class="select-multi-search-table">
		<div class="select">
			<selectMultiSearch
				ref="select"
				v-bind="{_clearable, _options, _values, values, disabled: _disabled}"
				@event="select"
			/>
		</div>
		<vTable
			:key="columnsData.length"
			v-bind="{_columns, columnsData, _columnsData: 'columnsData'}"
			@event="event"
		/>
	</div>
</template>

<script>
import {meta} from "@/modules/utils";
import {get, set, uniq, forEach} from "lodash";
import selectMultiSearch from "./input-select-multi-search.vue";
import vTable from "./table.vue";

export default {
	components: {selectMultiSearch, vTable},
	meta: {
		res: {
			props: {
				disabled: false,
				values: "values",
				options: {
					endpoint: {
						url: meta.items,
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
				Can only be an array of <i>objects</i>.
			`
		},

		// vTable props
		_columns: {type: Array, required: true, doc: true},
		_columnsDataOverwrite: {type: Object, required: true, doc: true}
	},
	data() {
		return {
			columnsData: [],
			items: [],
			edits: {}
		};
	},
	computed: {
		oValue: (t) => t._options.value
	},
	methods: {
		saveItems() {
			// save old items so each tableColumn still has data from an old select search
			const newItems = get(this.$refs, "select.items", []);
			this.items = uniq([...this.items, ...newItems]);
		},

		select({actions}) {
			const {data} = actions.update;

			this.saveItems();
			const selectValues = get(data, this._values);

			// populate table with data from the selected option
			this.columnsData = selectValues.map((id) => {
				const item = this.items.find((opt) => get(opt, this.oValue) === id);

				// overwrite properties if exists in _columnsDataOverwrite
				return {...item, ...this._columnsDataOverwrite};
			});

			this.update();
		},

		event({actions}) {
			const {data} = actions.update;

			forEach(data, (val, key) => set(this, key, val));
			this.update();
		},

		update() {
			this.$emit("event", {
				actions: {
					update: {data: {[this._values]: this.columnsData}}
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
