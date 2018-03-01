<template>
	<div class="select-multi-search">
		<Select v-model="data.value" @change="update" v-bind="{size, loading}" :remote-method="getListQ" filterable multiple remote reserve-keyword>
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
				value: "selectValue",
				defaultList: "defaultItems",
				options: {
					list: "https://sikaline.glitch.me/table-actions/options",
					key: "",
					label: "name",
					value: "id"
				}
			},
			data: {
				selectValue: ["1", "2"],
				defaultItems: [
					{
						id: "1",
						name: "stol"
					},
					{
						id: "2",
						name: "taske"
					}
				]
			}
		}
	},
	props: {
		meta: {type: Object, require: false, default: () => ({})},
		value: {type: Array, required: false, doc: true},
		_value: {type: String, required: true},
		options: {type: Object, required: false},
		_options: {type: Object, required: true, doc: true},
		defaultList: {type: Array, required: false, doc: true}
	},
	data() {
		return {
			loading: false,
			res: null,
			data: {
				value: []
			}
		}
	},
	computed: {
		endpoint: (t) => t._options.list,
		oKey: (t) => t._options.key,
		oLabel: (t) => t._options.label,
		oValue: (t) => t._options.value,

		list() {
			const resList = this.oKey ? get(this.res, this.oKey, []) : this.res || [];
			const defaultList = this.defaultList || [];
			const list = [...defaultList, ...resList];

			return uniqBy(list, this.oValue);
		},

		listMap: (t) => t.list.map(x => ({
			label: x[t.oLabel],
			value: x[t.oValue]
		})),

		size() {
			if (this.meta.location === "table") return "small";
			if (this.meta.location === "tabs") return "medium";
			return "medium";
		}
	},
	methods: {
		update(val) {
			this.$emit("fieldA", {
				action: "update",
				data: {[this._value]: val}
			});
		},

		getList: debounce(async function(q) {
			const {data} = await this.$http.get(this.endpoint, {params: {q, count: 30}});
			this.res = data;
			this.loading = false;
		}, 500),

		getListQ(q) {
			this.getList(q);
			this.loading = true;
		}
	},
	created() {
		this.data.value = this.listMap.map(x => x.value);
	}
};
</script>

<style lang="scss" scoped>
.select-multi-search {
	.el-select {
		width: 100%;
	}
}
</style>
