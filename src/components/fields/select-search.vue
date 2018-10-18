<template>
	<div class="select-search">
		<Select
		v-model="data.value"
		@change="update"
		v-bind="{size: sizeMap, loading}"
		:remote-method="getListQ"
		:disabled="_disabled"
		:clearable="_clearable"
		@visible-change="initSearch"
		filterable remote reserve-keyword>
			<Option v-for="item in listMap" v-bind="item" :key="item.value" />
		</Select>
	</div>
</template>

<script>
import {get, debounce, uniqBy} from "lodash";
import {Select, Option} from "element-ui";

export default {
	components: {Select, Option},
	meta: {
		res: {
			props: {
				disabled: false,
				value: "selectValue",
				options: {
					endpoint: "https://sikaline.glitch.me/table-actions/options",
					key: "",
					label: "name",
					value: "id"
				}
			},
			data: {
				selectValue: "1"
			}
		}
	},
	props: {
		_disabled: {type: Boolean, required: false, doc: true},
		meta: {type: Object, require: false, default: () => ({})},
		_clearable: {type: Boolean, required: false, default: true, doc: true},
		size: {type: String, default: "medium"},
		value: {type: [String, Number], required: false, doc: true},
		_value: {type: String, required: true},
		options: {type: Object, required: false},
		_options: {type: Object, required: true, doc: true}
	},
	data() {
		return {
			opened: false,
			loading: false,
			item: null,
			res: null,
			data: {
				value: this.value ? this.value.toString() : null
			}
		}
	},
	computed: {
		endpointClean: (t) => t.endpoint.split("?")[0], // without query
		endpoint: (t) => t._options.endpoint,
		nodata: (t) => !t.data.value,
		oKey: (t) => t._options.key,
		oLabel: (t) => t._options.label,
		oValue: (t) => t._options.value,

		list() {
			const resList = this.oKey ? get(this.res, this.oKey, []) : this.res || [];
			const itemList = this.item ? [this.item] : [];
			const list = [...itemList, ...resList];
			return uniqBy(list, this.oValue);
		},

		listMap: (t) => t.list.map(x => ({
			value: get(x, t.oValue).toString(),
			label: get(x, t.oLabel)
		})),

		sizeMap() {
			if (this.meta.location === "table") return "small";
			if (this.meta.location === "tabs") return "medium";
			return this.size;
		}
	},
	methods: {
		initSearch(open) {
			if (!this.opened && open) {
				this.opened = true;
				this.getList();
			}
		},

		update(val) {
			this.$emit("fieldA", {
				action: "update",
				data: {[this._value]: val}
			});
		},

		async getList(search) {
			const {data} = await this.$axios.get(this.endpoint, {params: {filter: {search}, count: 30}});
			this.res = data;
			this.loading = false;
		},

		getListDebounced: debounce(function(search) {
			this.getList(search);
		}, 500),

		getListQ(search) {
			this.loading = true;
			this.getListDebounced(search);
		},

		async getItem() {
			const {data} = await this.$axios.get(`${this.endpointClean}/${this.value}`);
			this.item = this.oKey ? data[this.oKey] : data;
		}
	},
	created() {
		if (this.value) this.getItem();
	}
};
</script>

<style lang="scss" scoped>
.select-search {
	.el-select {
		width: 100%;
	}
}
</style>
