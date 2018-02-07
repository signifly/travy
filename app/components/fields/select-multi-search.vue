<template>
	<div class="select-multi-search">
		<Select v-model="data.value" @change="update" v-bind="{size, loading}" :remote-method="getList" filterable multiple remote reserve-keyword>
			<Option v-for="item in list" v-bind="item" :key="item.value" />
		</Select>
	</div>
</template>

<script>
import {Select, Option} from "element-ui";

export default {
	components: {Select, Option},
	props: {
		meta: {type: Object, require: false, default: () => ({})},
		props: {type: Object, required: true},
		options: {type: String, required: true},
		value: {type: Array, required: false}
	},
	data() {
		return {
			loading: false,
			list: [],
			data: {
				value: this.value
			}
		}
	},
	computed: {
		size() {
			if (this.meta.location === "table") return "small";
			if (this.meta.location === "tabs") return "medium";
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
			const {data} = await this.$http.get(this.options, {params: {q}});
			this.list = data;
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
