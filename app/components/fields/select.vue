<template>
	<div class="select">
		<Select v-model="val" @change="update" v-bind="{size}" filterable>
			<Option v-for="option in options" v-bind="option" :key="option.value" />
		</Select>
	</div>
</template>

<script>
import {Select, Option} from "element-ui";

export default {
	components: {Select, Option},
	props: {
		meta: {type: Object, require: false, default: () => ({})},
		options: {type: Array, required: true},
		value: {type: String, required: false},
		xValue: {type: String, required: true}
	},
	data() {
		return {
			val: this.value
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
				data: {[this.xValue]: val}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.select {
	.el-select {
		/deep/ {
			.el-input__inner {
				// border: 0;
			}
		}
	}
}
</style>
