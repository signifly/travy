<template>
	<div class="status">
		<Tag :type="_status" size="small">{{text}}</Tag>
	</div>
</template>

<script>
import {Tag} from "element-ui";

export default {
	components: {Tag},
	meta: {
		res: {
			props: {
				text: "statusText",
				status: "primary"
			},
			data: {
				statusText: "14/144"
			}
		}
	},
	props: {
		text: {type: String, required: true, doc: true},
		_status: {
			type: String,
			required: true,
			doc: true,
			note: `danger, warning, info, primary, success`,
			validator: function (value) {
				return ["danger", "warning", "info", "primary", "success"].includes(value);
			}
		}
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
