<template>
	<div class="modal">
		<Dialog
			v-bind="{width, title}"
			:visible.sync="visibleC"
			:close-on-click-modal="false"
			:append-to-body="true"
			:modal-append-to-body="true"
		>
			<div class="fields">
				<field
					v-for="field in fields"
					:key="field.attribute"
					v-bind="{field, data, error}"
					@event="$emit('event', $event)"
				/>
			</div>

			<div class="footer" slot="footer">
				<div class="actions">
					<Button @click="visibleC = false" :disabled="!!loading">
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
import {translate} from "@/modules/utils";
import {Dialog, Button} from "element-ui";
import field from "./field";

export default {
	components: {Dialog, Button, field},
	props: {
		fields: {type: Array, required: true},
		data: {type: Object, required: true},
		error: {type: Object, required: true},
		title: {type: String, required: false},
		loading: {type: [Boolean, Number], required: false},

		width: {type: String, default: "700px"},
		visible: {type: Boolean, required: false},
		buttonSubmitText: {
			type: String,
			default: () => translate({en: "Submit", da: "Gem"})
		},
		buttonCancelText: {
			type: String,
			default: () => translate({en: "Cancel", da: "Annuller"})
		}
	},
	computed: {
		visibleC: {
			get() {
				return this.visible;
			},
			set() {
				this.$emit("update:visible", false);
			}
		}
	},
	methods: {
		submit() {
			this.$emit("submit");
		},
		enter({key}) {
			if (key === "Enter") this.submit();
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
