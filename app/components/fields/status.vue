<template>
	<div class="status">
		<Tag :type="status" size="small">{{text}}</Tag>
	</div>
</template>

<script>
import {Tag} from "element-ui";

export default {
	components: {Tag},
	props: {
		text: {type: String, required: true},
		status: {
			type: String,
			required: true,
			note: `danger, warning, info, primary, success`,
			validator: function (value) {
				return ["danger", "warning", "info", "primary", "success"].includes(value);
			}
		}
	},
	propsD: {
		text: "status",
		status: "primary"
	}
};
</script>

<style lang="scss" scoped>
.status {
	.el-tag {
		min-width: 6em;
		text-align: center;
	}
}
</style>
