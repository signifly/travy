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
		spec: {
			text: {type: String, required: true},
			status: {type: String, required: false},
			fallback: {
				type: Object,
				required: false,
				children: {
					text: {type: String, required: false},
					status: {type: String, required: false}
				}
			}
		},
		res: {
			props: {
				text: "4/8",
				status: "primary"
			}
		}
	},
	props: {
		text: {type: String, required: true},
		status: {type: String, required: false},
		fallback: {type: Object, default: () => ({})}
	},
	computed: {
		textC: (t) => t.text || t.fallback.text,
		statusC: (t) => t.status || t.fallback.status
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
