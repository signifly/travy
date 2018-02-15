<template>
	<div class="select-multi-search">
		<Select v-model="data.value" @change="update" v-bind="{size, loading}" :remote-method="getListQ" filterable multiple remote reserve-keyword>
			<Option v-for="item in listMap" v-bind="item" :key="item.value" />
		</Select>
	</div>
</template>

<script>
import {get, debounce} from "lodash";
import {Select, Option} from "element-ui";

export default {
	components: {Select, Option},
	props: {
		meta: {type: Object, require: false, default: () => ({})},
		value: {type: Array, required: false},
		xValue: {type: String, required: true},
		xOptions: {type: Object, required: true}
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
		endpoint: (t) => t.xOptions.endpoint,
		oKey: (t) => t.xOptions.key,
		oLabel: (t) => t.xOptions.label,
		oValue: (t) => t.xOptions.value,
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
				data: {[this.xValue]: val}
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
.select-multi-search {
	.el-select {
		width: 100%;
	}
}
</style>
