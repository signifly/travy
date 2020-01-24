<template>
	<div class="status">
		<Tag :type="statusC" size="small" :style="Style">{{ textC }}</Tag>
	</div>
</template>

<script>
import {Tag} from "element-ui";

const hexOpacity = ({hex, opacity}) => {
	hex = hex.replace("#", "");
	const r = parseInt(hex.substring(0, 2), 16);
	const g = parseInt(hex.substring(2, 4), 16);
	const b = parseInt(hex.substring(4, 6), 16);
	return "rgba(" + r + "," + g + "," + b + "," + opacity / 100 + ")";
};

export default {
	components: {Tag},
	meta: {
		res: {
			props: {
				text: "statusText",
				status: "statusColor",
				customColor: "customColor"
			},
			data: {
				statusText: "14/144",
				statusColor: "primary",
				customColor: "#ab40ff"
			}
		}
	},
	props: {
		_text: {type: String, required: true},
		_status: {type: String, required: false},
		customColor: {type: String, required: false, doc: true, note: "hex"},
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
		statusC: (t) => t.status || t._status,
		Style() {
			const hex = this.customColor;

			return (
				hex && {
					backgroundColor: hexOpacity({hex, opacity: 8}),
					borderColor: hexOpacity({hex, opacity: 12}),
					color: hex
				}
			);
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
