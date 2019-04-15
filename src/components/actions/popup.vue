<template>
	<popup v-bind="{position, type: 'action'}">
		<div class="popup">
			<div class="text">{{ text }}</div>
			<div class="buttons">
				<Button size="mini" :disabled="loading" @click="close">Cancel</Button>
				<Button size="mini" type="primary" :loading="loading" @click="submit">
					Submit
				</Button>
			</div>
		</div>
	</popup>
</template>

<script>
import {Button} from "element-ui";
import popup from "@/components/popup";

export default {
	components: {Button, popup},
	props: {
		position: {type: String, required: false, default: "bottom-right"},
		text: {type: String, required: false, default: "Are you sure?"},
		endpoint: {type: Object, required: true},
		payload: {type: Object, required: true}
	},
	data() {
		return {
			loading: false
		};
	},
	methods: {
		close() {
			this.$emit("close");
		},

		async submit() {
			try {
				this.loading = true;

				const {data} = await this.$axios({
					method: this.endpoint.method,
					url: this.endpoint.url,
					data: this.payload
				});

				this.$emit("submit", data);
			} catch (err) {
				this.loading = false;
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
