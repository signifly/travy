<template>
	<vPopup v-bind="{position}">
		<div class="delete">
			<div class="text">{{text}}</div>
			<div class="buttons">
				<Button size="mini" :disabled="loading" @click="close">Cancel</Button>
				<Button size="mini" type="primary" :loading="loading" @click="submit">Submit</Button>
			</div>
		</div>
	</vPopup>
</template>

<script>
import {Button} from "element-ui";
import vPopup from "@/components/popup.vue";
import {endpointUrl} from "@/modules/utils";

export default {
	components: {Button, vPopup},
	props: {
		alt: {type: Object, required: true},
		position: {type: String, required: false, default: "bottom-right"},
		text: {type: String, required: false, default: "Are you sure?"},
		endpoint: {type: Object, required: true},
		onSubmit: {type: String, required: false},
		data: {type: Object, required: false}
	},
	data() {
		return {
			loading: false
		}
	},
	computed: {
		dataComb: (t) => ({...t.alt.data, ...t.data}),
		endpointUrl: (t) => endpointUrl({data: t.dataComb, url: t.endpoint.url})
	},
	methods: {
		close() {
			this.$emit("close");
		},

		submitAfter({data} = {}) {
			if (this.onSubmit) {
				const url = endpointUrl({data: data.data || this.dataComb, url: this.onSubmit});
				this.$router.push(`/${url}`);
			} else {
				this.$emit("fieldA", {
					action: "refresh",
					done: async () => this.close()
				});
			}
		},

		async submit() {
			try {
				this.loading = true;
				const {data} = await this.$http[this.endpoint.method](this.endpointUrl, {data: this.data});
				this.submitAfter({data});
			} catch (e) {} finally {
				this.loading = false;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.delete {
	.text {
		word-break: break-word;
		text-align: left;
		margin-bottom: 1.25em;
		font-size: 13px;
	}
	.buttons {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
}
</style>
