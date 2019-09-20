<template>
	<div class="time-since">{{ time }}</div>
</template>

<script>
import {translate} from "@/modules/utils";

const type = {
	h: translate({en: "h", da: "t"}),
	d: "d",
	m: "m",
	s: "s"
};

const timeSince = (timestamp) => {
	const seconds = Math.floor(new Date() - timestamp) / 1000;
	let interval;

	// interval = Math.floor(seconds / 31536000);
	// if (interval >= 1) return `${interval} years`;
	//
	// interval = Math.floor(seconds / 2592000);
	// if (interval >= 1) return `${interval} months`;

	interval = Math.floor(seconds / 86400);
	if (interval >= 1) return `${interval}${type.d}`;

	interval = Math.floor(seconds / 3600);
	if (interval >= 1) return `${interval}${type.h}`;

	interval = Math.floor(seconds / 60);
	if (interval >= 1) return `${interval}${type.m}`;

	return `${Math.floor(seconds)}${type.s}`;
};

export default {
	meta: {
		res: {
			props: {
				timestamp: "timestamp"
			},
			data: {
				timestamp: 1556021849
			}
		}
	},
	props: {
		timestamp: {type: Number, required: true}
	},
	data() {
		return {
			interval: null,
			time: ""
		};
	},
	methods: {
		since() {
			this.time = timeSince(this.timestamp * 1000);
		}
	},
	created() {
		this.interval = setInterval(this.since, 5000);
		this.since();
	},
	beforeDestroy() {
		clearInterval(this.interval);
	}
};
</script>

<style lang="scss" scoped>
.time-since {
	color: $blue4;
	font-size: 14px;
}
</style>
