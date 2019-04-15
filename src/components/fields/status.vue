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
				text: "statusText",
				status: "statusColor"
			},
			data: {
				statusText: "14/144",
				statusColor: "primary"
			}
		}
	},
	props: {
		_text: {type: String, required: true},
		_status: {type: String, required: false},
		text: {
			type: String,
			required: false,
			doc: true,
			note: `fallbacks as not mapped`
		},
		status: {
			type: String,
			required: false,
			doc: true,
			note: `fallbacks as not mapped`,
			validator: (val) =>
				["danger", "warning", "info", "primary", "success"].includes(val)
		}
	},
	computed: {
		textC: (t) => t.text || t._text,
		statusC: (t) => t.status || t._status
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
