<template>
	<div class="date">{{dateTime}}</div>
</template>

<script>
import {date} from "@/modules/utils";

export default {
	props: {
		epoch: {type: String, required: false}
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
