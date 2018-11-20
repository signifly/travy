<template>
	<vPopup v-bind="{position}">
		<div class="popup">
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
		position: {type: String, required: false, default: "bottom-right"},
		text: {type: String, required: false, default: "Are you sure?"},
		endpoint: {type: Object, required: true},
		onSubmit: {type: String, required: false},
		payload: {type: Object, required: true}
	},
	data() {
		return {
			loading: false
		}
	},
	methods: {
		close() {
			this.$emit("close");
		},

		async submit() {
			try {
				this.loading = true;

				const {data: {data}} = await this.$axios({
					method: this.endpoint.method,
					url: this.endpoint.url,
					data: this.payload,
				});

				this.submitAfter({data});
			} catch(err) {
				this.loading = false;
			}
		},

		submitAfter({data} = {}) {
			if (this.onSubmit) {
				const url = endpointUrl({data: {...this.payload.data, ...data}, url: this.onSubmit});
				this.$router.push(url);
			} else {
				this.$emit("fieldA", {
					action: "refresh",
					done: async () => this.close()
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.popup {
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
