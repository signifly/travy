<template>
	<div class="dropdown">
		<Select v-model="val" @change="update" size="small">
			<Option v-for="option in options" v-bind="option" :key="option.value" />
		</Select>
	</div>
</template>

<script>
import {Select, Option} from "element-ui";

export default {
	components: {Select, Option},
	props: {
		options: {type: Array, required: true},
		column: {type: Object, required: true},
		value: {type: String, required: false}
	},
	data() {
		return {
			val: this.value
		}
	},
	computed: {
		key() {
			return this.column.fieldType.props.value;
		}
	},
	methods: {
		update(val) {
			this.$emit("update", {[this.key]: val});
		}
	}
};
</script>

<style lang="scss" scoped>
.dropdown {
	.el-select {
		/deep/ {
			.el-input__inner {
				// border: 0;
			}
		}
	}
}
</style>
