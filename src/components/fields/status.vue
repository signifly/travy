<template>
	<div class="status" :class="{color}">
		<Tag :type="status" :color="color" size="small">{{ text }}</Tag>
	</div>
</template>

<script>
import {Tag} from "element-ui";

export default {
	components: {Tag},
	meta: {
		spec: "props",
		res: {
			props: {
				status: "primary",
				color: "#e6e6ff",
				text: "4/8"
			}
		}
	},
	props: {
		color: {type: String, required: false, note: "overrides status"},
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

	&.color .el-tag {
		border-color: #dedede;
		color: transparentize(black, 0.6);
	}
}
</style>
