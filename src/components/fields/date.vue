<template>
	<time class="date" :datetime="datetime" v-text="date" />
</template>

<script>
import {formatDate} from "element-ui/packages/date-picker/src/util";

export default {
	meta: {
		res: {
			props: {
				timestamp: "dateTime",
				format: "yyyy-MM-dd HH:mm:ss"
			},
			data: {
				dateTime: 1517529600
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
		date: (t) => formatDate(t.timestamp * 1000, t._format),
		datetime: (t) => new Date(t.timestamp * 1000)
	}
};
</script>
