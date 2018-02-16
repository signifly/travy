<template>
	<div class="date">{{dateTime}}</div>
</template>

<script>
import {date} from "@/modules/utils";

export default {
	meta: {
		res: {
			props: {
				epoch: "dateTime"
			},
			data: {
				dateTime: 1517529600
			}
		}
	},
	props: {
		epoch: {type: Number, required: false}
	},
	computed: {
		date: (t) => date(t.epoch),
		dateTime: (t) => t.epoch ? t.date.sDateTime : ""
	}
};
</script>

<style lang="scss" scoped>
.date {

}
</style>
