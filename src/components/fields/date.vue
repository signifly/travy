<template>
	<time class="date" :datetime="datetime" v-text="date" />
</template>

<script>
import {formatDate} from "element-ui/src/utils/date-util";

export default {
	meta: {
		spec: "props",
		res: {
			props: {
				timestamp: 1517529600,
				format: "yyyy-MM-dd"
			}
		}
	},
	props: {
		timestamp: {type: Number, required: false},
		format: {
			type: String,
			default: "yyyy-MM-dd HH:mm:ss",
			note: `
				<a target="_blank" href="http://element.eleme.io/#/en-US/component/date-picker#date-formats">Formats</a>
			`
		}
	},
	computed: {
		datetime: (t) => new Date(t.timestamp * 1000),
		date() {
			if (this.timestamp) {
				return formatDate(this.timestamp * 1000, this.format);
			} else {
				return "—";
			}
		}
	}
};
</script>
