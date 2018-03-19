<template>
	<div class="select-multi-search-table">
		<div class="select">
			<vSelectMultiSearch ref="select" v-bind="{_clearable, _options, _values, values, disabled}" @fieldA="select" />
		</div>
		<vTable :key="columnsData.length" v-bind="{_columns, columnsData, _columnsData: 'columnsData'}" @fieldA="fieldA" />
	</div>
</template>

<script>
import {get, set, forEach} from "lodash";
import {vSelectMultiSearch, vTable} from "./index";

export default {
	components: {vSelectMultiSearch},
	meta: {
		res: {
			props: {
				values: "values",
				options: {
					list: "https://api.sikane.signifly.com/v1/stock-item-models",
					key: "data",
					label: "name",
					value: "id"
				},

				columns: [
					{
						name: "title",
						label: "Title",
						fieldType: {
							id: "vText",
							props: {
								text: "name"
							}
						}
					},
					{
						name: "switch",
						label: "Switch",
						fieldType: {
							id: "vSwitch",
							props: {
								value: "dd"
							}
						}
					}
				]
			}
		}
	},
	props: {
		disabled: {type: Boolean, required: false},
		meta: {type: Object, require: false, default: () => ({})},

		// vSelectMultiSearch props
		_clearable: {type: Boolean, required: false, default: true, doc: true},
		_options: {type: Object, required: true, doc: true},
		_values: {type: String, required: true},
		values: {type: Array, required: false, default: () => [], doc: true, note: `
			Can only be an array of <i>objects</i>.
		`},

		// vTable props
		_columns: {type: Array, required: true, doc: true}
	},
	data() {
		return {
			columnsData: [],
			edits: {},
		}
	},
	computed: {
		oValue: (t) => t._options.value
	},
	methods: {
		select({data}) {
			const selectValues = get(data, this._values);
			const options = get(this.$refs, "select.listOptions", []);
			this.columnsData = selectValues.map(id => options.find(opt => get(opt, this.oValue) === id));
			this.update();
		},

		fieldA({data}) {
			forEach(data, (val, key) => set(this, key, val));
			this.update();
		},

		update() {
			this.$emit("fieldA", {
				action: "update",
				data: {[this._values]: this.columnsData}
			});
		}
	},
	beforeCreate() {
		this.$options.components.vTable = vTable;
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
