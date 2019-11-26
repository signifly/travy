<script>
export default {
	render: () => ({}),
	props: {
		external: {type: Boolean, required: false},
		url: {type: String, required: true}
	},
	created() {
		if (this.external) {
			window.location.href = this.url;
			this.$emit("close");
		} else {
			this.$router.push({
				path: this.url,
				query: {modifiers: this.$route.query.modifiers}
			});
		}
	}
};
</script>
