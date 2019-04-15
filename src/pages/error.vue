<template>
	<div class="error">
		<div class="title">{{ info.title }}</div>
		<div class="text">{{ info.text }}&nbsp;&nbsp;(-_-｡)</div>
	</div>
</template>

<script>
const info = {
	404: {
		title: 404,
		text: "Page not found"
	},
	403: {
		title: 403,
		text: "You don't have access to this page"
	},
	500: {
		title: 500,
		text: "Server is unavailable"
	}
};

export default {
	props: {
		status: {type: Number, default: 404}
	},
	computed: {
		info: (t) => info[t.status]
	},
	created() {
		history.replaceState(null, null, "/");
	}
};
</script>

<style lang="scss" scoped>
.error {
	text-align: center;
	padding: 7em 0 2em;

	.title {
		font-size: 5em;
		margin-bottom: 0.75em;
		font-weight: 600;
	}
}
</style>
