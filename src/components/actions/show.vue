<script>
export default {
	props: {
		endpoint: {type: Object, required: true},
		download: {type: Boolean, required: false},
		external: {type: Boolean, required: false}
	},
	render: () => ({}),
	methods: {
		downloadFile() {
			const link = document.createElement("a");
			link.href = this.endpoint.url;
			link.download = true;
			link.click();
		},

		go() {
			if (this.external) {
				window.location = this.endpoint.url;
				return;
			}

			this.$router.push({path: this.endpoint.url, query: {modifiers: this.$route.query.modifiers}});
		}
	},
	created() {
		this.$emit("close");
		this.download ? this.downloadFile() : this.go();
	}
};
</script>
