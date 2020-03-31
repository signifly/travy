<script>
import {transProps} from "@/modules/utils";

export default {
	render: () => ({}),
	props: {
		external: {type: Boolean, required: false},
		data: {type: Object, required: false},
		url: {type: String, required: true}
	},
	computed: {
		trans() {
			return transProps({
				data: this.data,
				val: {
					url: this.url
				}
			});
		}
	},
	created() {
		if (this.external) {
			window.location.href = this.trans.url;
			this.$emit("close");
		} else {
			this.$router.push({
				path: this.trans.url,
				query: {modifiers: this.$route.query.modifiers}
			});
		}
	}
};
</script>
