<template>
	<div class="modal">
		<Dialog
			:close-on-click-modal="false"
			:modal-append-to-body="true"
			:visible.sync="visible"
			:append-to-body="false"
			v-bind="{width, title}"
		>
			<div class="fields">
				<field
					v-for="field in fields"
					:key="field.attribute"
					v-bind="{field, data, error}"
					@event="event"
				/>
			</div>

			<div class="footer" slot="footer">
				<div class="actions">
					<Button @click="visible = false" :disabled="!!loading">
						{{ buttonCancelText }}
					</Button>
					<Button type="primary" @click="submit" :loading="!!loading">
						{{ buttonSubmitText }}
					</Button>
				</div>

				<div class="error" v-if="error.message">{{ error.message }}</div>

				<slot name="footer" />
			</div>
		</Dialog>
	</div>
</template>

<script>
import {translate, mergeData} from "@/modules/utils";
import {Dialog, Button} from "element-ui";
import field from "@/components/field";

export default {
	components: {Dialog, Button, field},
	props: {
		endpoint: {type: Object, required: true},
		payload: {type: Object, required: false},
		width: {type: String, default: "700px"},
		title: {type: String, required: false},
		fields: {type: Array, required: true},
		buttonSubmitText: {
			type: String,
			default: () => translate({en: "Submit", da: "Gem"})
		},
		buttonCancelText: {
			type: String,
			default: () => translate({en: "Cancel", da: "Annuller"})
		}
	},
	data() {
		return {
			data: this.payload.data,
			loading: false,
			error: {}
		};
	},
	computed: {
		visible: {
			get: () => true,
			set() {
				this.$emit("close");
			}
		}
	},
	methods: {
		enter({key}) {
			if (key === "Enter") this.submit();
		},

		event({actions}) {
			if (actions.update) {
				this.data = mergeData(this.data, actions.update.data);
			}
		},

		async submit() {
			try {
				this.loading = true;

				const {data} = await this.$axios({
					method: this.endpoint.method,
					url: this.endpoint.url,
					customErr: true,
					data: {
						...this.payload,
						data: this.data
					}
				});

				this.$emit("submit", data);
			} catch (err) {
				this.error = err;
				this.loading = false;
			}
		}
	},
	mounted() {
		this.$el.addEventListener("keyup", this.enter);
	},
	beforeDestroy() {
		this.$el.removeEventListener("keyup", this.enter);
	}
};
</script>

<style lang="scss" scoped>
.modal {
	text-align: left;
}

.fields {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin: -$fieldMargin 0;
}

.footer {
	.error {
		margin-top: 1em;
		font-size: 0.875em;
		color: $danger;
	}
}
</style>
