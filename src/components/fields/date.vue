<template>
	<div class="date">{{dateValue}}</div>
</template>

<script>
import {date} from "@/modules/utils";

export default {
	meta: {
		res: {
			props: {
				epoch: "date"
			},
			data: {
				date: 1517529600
			}
		}
	},
	props: {
		epoch: {type: Number, required: false, doc: true}
	},
	computed: {
		date: (t) => date(t.epoch),
		dateValue: (t) => t.epoch ? t.date.sDate : ""
	}
};
</script>

<style lang="scss" scoped>
.date {

}
</style>
