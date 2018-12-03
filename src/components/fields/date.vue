<template>
	<div class="date">{{dateValue}}</div>
</template>

<script>
import {date} from "@/modules/utils";

export default {
	meta: {
		res: {
			props: {
				timestamp: "date"
			},
			data: {
				date: 1517529600
			}
		}
	},
	props: {
		timestamp: {type: Number, required: false, doc: true}
	},
	computed: {
		date: (t) => date(t.timestamp),
		dateValue: (t) => t.timestamp ? t.date.sDate : ""
	}
};
</script>

<style lang="scss" scoped>
.date {

}
</style>
