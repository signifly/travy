<script>
import {endpointUrl} from "@/modules/utils";

export default {
	props: {
		alt: {type: Object, required: true},
		data: {type: Object, required: false},
		endpoint: {type: Object, required: true},
		download: {type: Boolean, required: false}
	},
	render: () => ({}),
	computed: {
		dataComb: (t) => ({...t.alt.data, ...t.data}),
		endpointUrl: (t) => endpointUrl({data: t.dataComb, url: t.endpoint.url})
	},
	methods: {
		downloadFile() {
			const link = document.createElement("a");
			link.href = this.endpointUrl;
			link.download = true;
			link.click();
		},

		go() {
			this.$router.push({path: this.endpointUrl, query: {modifiers: this.$route.query.modifiers}});
		}
	},
	created() {
		this.$emit("close");
		this.download ? this.downloadFile() : this.go();
	}
};
</script>
