<script>
import {download} from "@/modules/utils";

export default {
	render: () => ({}),
	props: {
		endpoint: {type: Object, required: true},
		download: {type: Boolean, required: false}
	},
	computed: {
		url: (t) => t.endpoint.url,
		external: (t) =>
			t.url.startsWith("http") && !t.url.startsWith(window.location.origin)
	},
	methods: {
		downloadFile() {
			download({url: this.url});
		},

		go() {
			if (this.external) {
				window.location.href = this.url;
			} else {
				this.$router.push({
					path: this.url,
					query: {modifiers: this.$route.query.modifiers}
				});
			}
		}
	},
	created() {
		this.$emit("close");
		this.download ? this.downloadFile() : this.go();
	}
};
</script>
