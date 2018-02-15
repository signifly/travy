<template>
	<div class="select-multi-add">
		<Select v-model="data.value" @change="update" v-bind="{size}" filterable multiple allow-create>
			<Option v-for="option in options" v-bind="option" :key="option.value" />
		</Select>
	</div>
</template>

<script>
import {Select, Option} from "element-ui";

export default {
	components: {Select, Option},
	props: {
		meta: {type: Object, require: false},
		options: {type: Array, required: true},
		value: {type: Array, required: false},
		xValue: {type: String, required: true},
	},
	data() {
		return {
			data: {
				value: this.value
			}
		}
	},
	computed: {
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
		}
	}
}
</script>

<style lang="scss" scoped>
.select-multi-add {
	.el-select {
		width: 100%;
	}
}
</style>
