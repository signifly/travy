<template>
	<div class="select-multi-search">
		<Select v-model="data.value" @change="update" v-bind="{size, loading}" :remote-method="getList" filterable multiple remote reserve-keyword>
			<Option v-for="item in listMap" v-bind="item" :key="item.value" />
		</Select>
	</div>
</template>

<script>
import {get} from "lodash";
import {Select, Option} from "element-ui";

export default {
	components: {Select, Option},
	props: {
		meta: {type: Object, require: false, default: () => ({})},
		props: {type: Object, required: true},
		options: {type: Object, required: true},
		value: {type: Array, required: false}
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
		endpoint: (t) => t.options.endpoint,
		oKey: (t) => t.options.key,
		oLabel: (t) => t.options.label,
		oValue: (t) => t.options.value,
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
				data: {[this.props.value]: val}
			});
		},

		async getList(q) {
			this.loading = true;
			const {data} = await this.$http.get(this.endpoint, {params: {q}});
			this.res = data;
			this.loading = false;
		}
	},
	created() {
		// this.getList();
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
