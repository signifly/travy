<template>
	<div class="text">{{ textFinal }}</div>
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
		_textDefault: {type: [String, Number], required: false, doc: true}
	},
	computed: {
		textFinal: (t) => toString(t.text) || t._textDefault || "—"
	}
};
</script>

<style lang="scss" scoped>
.text {
	display: block;
	color: $black1;
	text-decoration: none;
	font-weight: 600;
}
</style>
