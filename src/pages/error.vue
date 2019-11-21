<template>
	<div class="error">
		<div class="info">
			<div class="title">{{ info.title }}</div>
			<div class="text">{{ info.text }}&nbsp;&nbsp;(-_-｡)</div>
		</div>
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
	data: () => ({
		path: ""
	}),
	computed: {
		ready: (t) => t.$store.getters["base/ready"],
		info: (t) => info[t.status]
	},
	watch: {
		path(path) {
			history.replaceState(null, null, path);
		}
	},
	beforeRouteEnter(to, from, next) {
		next((vm) => {
			vm.path = from.fullPath;
		});
	}
};
</script>

<style lang="scss" scoped>
.error {
	.info {
		padding: 12em 0 2em;
		text-align: center;

		.title {
			margin-bottom: 0.75em;
			font-weight: 600;
			font-size: 5em;
		}
	}
}
</style>
