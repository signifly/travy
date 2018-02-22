<template>
	<div class="select-search">
		<Select v-model="data.value" @change="update" v-bind="{size, loading}" :remote-method="getListQ" filterable remote reserve-keyword>
			<Option v-for="item in listMap" v-bind="item" :key="item.value" />
		</Select>
	</div>
</template>

<script>
import {get, debounce} from "lodash";
import {Select, Option} from "element-ui";

export default {
	components: {Select, Option},
	meta: {
		res: {
			props: {
				value: "selectValue",
				options: {
					endpoint: "https://sikaline.glitch.me/table-actions/options",
					key: "",
					label: "name",
					value: "id"
				}
			},
			data: {
				selectValue: null
			}
		}
	},
	props: {
		meta: {type: Object, require: false, default: () => ({})},
		value: {type: Array, required: false, doc: true},
		_value: {type: String, required: true},
		options: {type: Object, required: false},
		_options: {type: Object, required: true, doc: true}
	},
	data() {
		return {
			loading: false,
			res: null,
			data: {
				value: this.value
			}
		}
	},
	computed: {
		endpoint: (t) => t._options.endpoint,
		oKey: (t) => t._options.key,
		oLabel: (t) => t._options.label,
		oValue: (t) => t._options.value,
		list: (t) => t.oKey ? get(t.res, t.oKey, []) : t.res || [],

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
