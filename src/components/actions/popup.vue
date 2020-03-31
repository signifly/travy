<template>
	<popup v-bind="{position, type: 'action'}">
		<div class="popup-action">
			<div class="text">{{ text }}</div>
			<div class="buttons">
				<Button size="mini" :disabled="loading" @click="close">
					{{ $translate({en: "Cancel", da: "Annuller"}) }}
				</Button>
				<Button size="mini" type="primary" :loading="loading" @click="submit">
					{{ $translate({en: "Submit", da: "Gem"}) }}
				</Button>
			</div>
		</div>
	</popup>
</template>

<script>
import {transProps, translate} from "@/modules/utils";
import popup from "@/components/popup";
import {Button} from "element-ui";

export default {
	components: {Button, popup},
	props: {
		actionOpts: {type: Object, required: true},
		endpoint: {type: Object, required: true},
		payload: {type: Object, required: false},
		data: {type: Object, required: false},
		text: {
			type: String,
			required: false,
			default: () =>
				translate({
					en: "Are you sure? Please confirm this action.",
					da: "Er du sikker? Bekræft venligst."
				})
		}
	},
	data: () => ({
		loading: false
	}),
	computed: {
		position: (t) => t.actionOpts.position || "bottom-right",
		trans() {
			return transProps({
				data: this.data,
				val: {
					endpoint: this.endpoint,
					payload: this.payload
				}
			});
		}
	},
	methods: {
		close() {
			this.$emit("close");
		},

		async submit() {
			try {
				const {payload, endpoint} = this.trans;
				this.loading = true;

				const {data} = await this.$axios({
					method: endpoint.method,
					url: endpoint.url,
					data: payload
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
.popup-action {
	.text {
		word-break: break-word;
		text-align: left;
		margin-bottom: 1.25em;
		line-height: 1.25em;
		font-size: 12px;
		color: $blue1;
	}
	.buttons {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
}
</style>
