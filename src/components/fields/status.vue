<template>
	<div class="status">
		<Tag :type="statusC" size="small">{{ textC }}</Tag>
	</div>
</template>

<script>
import {Tag} from "element-ui";

export default {
	components: {Tag},
	meta: {
		res: {
			props: {
				text: "text",
				status: "status",
				_fallback: {
					text: "fallback",
					status: "fallback"
				}
			},
			data: {
				text: "4/8",
				status: "primary"
			}
		}
	},
	props: {
		text: {type: String, required: true},
		status: {type: String, required: false},
		_fallback: {type: Object, default: () => ({})}
	},
	computed: {
		textC: (t) => t.text || t._fallback.text,
		statusC: (t) => t.status || t._fallback.status
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
