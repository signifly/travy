<template>
	<div class="dropdown">
		<Select v-model="val">
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
		value: {type: String, required: false}
	},
	data() {
		return {
			val: this.value
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
