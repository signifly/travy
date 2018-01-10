<template>
	<div class="status">
		<Tag :type="status" size="medium">{{text}}</Tag>
	</div>
</template>

<script>
import {Tag} from "element-ui";

export default {
	components: {Tag},
	props: {
		text: {type: String, required: true},
		status: {
			required: true,
			validator: function (value) {
				return ["danger", "warning", "info", "success"].includes(value);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.status {
	.el-tag {
		width: 6em;
		text-align: center;
	}
}
</style>
