<template>
	<div class="status">
		<Tag :type="status" size="small">{{ text }}</Tag>
	</div>
</template>

<script>
import {Tag} from "element-ui";

export default {
	components: {Tag},
	meta: {
		spec: {
			text: {type: String, required: true},
			status: {type: String, required: false}
		},
		res: {
			props: {
				status: "primary",
				text: "4/8"
			}
		}
	},
	props: {
		status: {type: String, required: false},
		text: {type: String, required: true}
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
