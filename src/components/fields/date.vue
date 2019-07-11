<template>
	<time class="date" :datetime="datetime" v-text="date" />
</template>

<script>
import {formatDate} from "element-ui/src/utils/date-util";

export default {
	meta: {
		res: {
			props: {
				timestamp: "timestamp",
				format: "yyyy-MM-dd HH:mm:ss"
			},
			data: {
				timestamp: 1517529600
			}
		}
	},
	props: {
		timestamp: {type: Number, required: false, doc: true},
		_format: {
			type: String,
			default: "yyyy-MM-dd HH:mm:ss",
			doc: true,
			note: `
				<a target="_blank" href="http://element.eleme.io/#/en-US/component/date-picker#date-formats">Formats</a>
			`
		}
	},
	computed: {
		datetime: (t) => new Date(t.timestamp * 1000),
		date() {
			if (this.timestamp) {
				return formatDate(this.timestamp * 1000, this._format);
			} else {
				return "-";
			}
		}
	}
};
</script>
