<template>
	<div class="text" :class="_status">{{textFinal}}</div>
</template>

<script>
import {toString} from "lodash";

export default {
	meta: {
		res: {
			props: {
				text: "title",
				textDefault: "default text"
			},
			data: {
				title: "some text"
			}
		}
	},
	props: {
		text: {type: [String, Number], required: false, doc: true},
		_textDefault: {type: [String, Number], required: false, doc: true},

		_status: {
			type: String,
			required: false,
			doc: true,
			note: `danger, warning, info, primary, success`,
			validator: function (value) {
				return ["danger", "warning", "info", "primary", "success"].includes(value);
			}
		}
	},
	computed: {
		textFinal: (t) => toString(t.text) || t._textDefault
	}
};
</script>

<style lang="scss" scoped>
.text {
	&.danger {
		color: $danger;
	}
	&.warning {
		color: $warning;
	}
	&.info {
		color: $info;
	}
	&.primary {
		color: $primary;
	}
	&.success {
		color: $success;
	}
}
</style>
